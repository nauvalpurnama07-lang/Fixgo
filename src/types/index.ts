export type UserRole = 'owner' | 'pa' | 'technician' | 'customer';

export type ServiceStatus =
  | 'ORDER_RECEIVED'
  | 'WAITING_INSPECTION'
  | 'CUSTOMER_APPROVAL'
  | 'WAITING_PAYMENT'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'QUALITY_CONTROL'
  | 'COMPLETED'
  | 'PICKED_UP'
  | 'CANCELLED';

export interface ServiceOrder {
  id: string; // e.g. "FXG-TASIK-2026-0849"
  outletId: string; // e.g. "outlet_tasikmalaya"
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  issueDescription: string;
  selectedService: string;
  status: ServiceStatus;
  estimatedCost: number;
  finalCost?: number;
  assignedTechnicianId?: string;
  inspectionNotes?: string;
  photosBefore?: string[];
  photosAfter?: string[];
  partsUsed?: {
    partId: string;
    sku: string;
    name: string;
    quantity: number;
  }[];
  warrantyCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'screen' | 'battery' | 'housing' | 'camera' | 'ic_chip' | 'tool';
  compatibleDevices: string[];
  purchasePrice: number;
  sellingPrice: number;
  stockQty: number;
  minStockAlert: number;
  outletId: string;
}

export interface DigitalWarranty {
  warrantyCode: string;
  orderId: string;
  deviceModel: string;
  serviceType: string;
  customerName: string;
  durationMonths: number;
  validUntil: string;
  isActive: boolean;
}
