import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';
  const searchParams = request.nextUrl.searchParams;

  // Detect if accessing through dedicated Staff / POS subdomain
  // e.g. pos.fixgo.id, staff.fixgo.id, admin.fixgo.id, or local query ?portal=pos
  const isPosSubdomain =
    host.startsWith('pos.') ||
    host.startsWith('staff.') ||
    host.startsWith('admin.') ||
    searchParams.get('portal') === 'pos';

  const sessionCookie = request.cookies.get('fixgo_staff_session');

  // --- SECTOR 1: STAFF PORTAL DOMAIN (pos.fixgo.id / staff.fixgo.id) ---
  if (isPosSubdomain) {
    // If accessing root '/' on pos subdomain:
    if (pathname === '/') {
      // If not authenticated, rewrite root directly to staff login terminal!
      if (!sessionCookie || !sessionCookie.value) {
        return NextResponse.rewrite(new URL('/dashboard/login', request.url));
      }

      try {
        const session = JSON.parse(decodeURIComponent(sessionCookie.value));
        if (session.role === 'owner') {
          return NextResponse.redirect(new URL('/dashboard/owner', request.url));
        } else if (session.role === 'pa') {
          return NextResponse.redirect(new URL('/dashboard/cashier', request.url));
        } else {
          return NextResponse.redirect(new URL('/dashboard/technician', request.url));
        }
      } catch {
        return NextResponse.rewrite(new URL('/dashboard/login', request.url));
      }
    }
  }

  // --- SECTOR 2: ROUTE GUARDS ON ALL DASHBOARD URLS ---
  // Protect all /dashboard routes except /dashboard/login
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    // 1. Not Authenticated: No valid session cookie found
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'unauthorized');
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = JSON.parse(decodeURIComponent(sessionCookie.value));
      const role = session.role; // 'owner' | 'pa' | 'technician'

      // 2. Role-Based Access Control (RBAC):
      // - Only 'owner' can access /dashboard/owner
      if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
        const fallbackUrl = new URL(
          role === 'pa' ? '/dashboard/cashier' : '/dashboard/technician',
          request.url
        );
        fallbackUrl.searchParams.set('error', 'forbidden');
        return NextResponse.redirect(fallbackUrl);
      }

      // - Only 'technician' or 'owner' can access /dashboard/technician
      if (
        pathname.startsWith('/dashboard/technician') &&
        role !== 'technician' &&
        role !== 'owner'
      ) {
        const fallbackUrl = new URL('/dashboard/cashier', request.url);
        fallbackUrl.searchParams.set('error', 'forbidden');
        return NextResponse.redirect(fallbackUrl);
      }

      // - Only 'pa' (cashier) or 'owner' can access /dashboard/cashier
      if (
        (pathname.startsWith('/dashboard/cashier') || pathname.startsWith('/dashboard/pa')) &&
        role !== 'pa' &&
        role !== 'owner'
      ) {
        const fallbackUrl = new URL('/dashboard/technician', request.url);
        fallbackUrl.searchParams.set('error', 'forbidden');
        return NextResponse.redirect(fallbackUrl);
      }
    } catch {
      // Malformed cookie -> force re-login
      const loginUrl = new URL('/dashboard/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
