'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { OUTLET_TASIKMALAYA } from '@/lib/constants';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  showHandover?: boolean;
}

const QUICK_PROMPTS = [
  { label: '🔋 Biaya Ganti Baterai', prompt: 'Berapa biaya ganti baterai original iPhone?' },
  { label: '📱 Layar Retina OLED', prompt: 'Berapa harga ganti layar / LCD iPhone dan apakah TrueTone tetap aktif?' },
  { label: '👤 Face ID Tidak Terbaca', prompt: 'Apakah sensor Face ID rusak bisa diperbaiki tanpa ganti mesin?' },
  { label: '🛡️ Garansi Digital', prompt: 'Bagaimana cara cek dan klaim garansi digital FixGo?' },
  { label: '📍 Outlet Tasikmalaya', prompt: 'Di mana alamat dan jam buka outlet FixGo Tasikmalaya?' },
];

export default function AssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Resmi FixGo Diagnostic Lab Tasikmalaya. Saya siap memberikan estimasi biaya perbaikan, informasi garansi resmi, dan panduan kendala teknis iPhone Anda. Ada yang bisa dibantu hari ini?',
      timestamp: 'Baru saja',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `initial-${Date.now()}`,
        sender: 'ai',
        text: 'Percakapan telah direset. Silakan tanyakan estimasi biaya servis iPhone atau kendala perangkat Anda.',
        timestamp: getCurrentTime(),
      },
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      const shouldShowHandover =
        ['konsultasi', 'teknisi', 'toko', 'alamat', 'outlet', 'wa', 'whatsapp', 'mesin', 'ic', 'air'].some((w) =>
          data.reply.toLowerCase().includes(w) || text.toLowerCase().includes(w)
        );

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply,
        timestamp: getCurrentTime(),
        showHandover: shouldShowHandover,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Mohon maaf Kak, sistem AI sedang dalam pemeliharaan berkala. Kakak dapat langsung berkonsultasi dengan teknisi kami via WhatsApp resmi ya.',
          timestamp: getCurrentTime(),
          showHandover: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format text with bullets and bolding cleanly
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-2" />;
      
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

      // Simple parser for bold *text*
      const parts = cleanLine.split(/(\*[^*]+\*)/g);

      return (
        <div key={idx} className={`${isBullet ? 'flex items-start gap-1.5 pl-1 my-0.5' : 'my-0.5'}`}>
          {isBullet && <span className="text-[#0066FF] font-bold text-xs select-none">•</span>}
          <span>
            {parts.map((part, pIdx) => {
              if (part.startsWith('*') && part.endsWith('*')) {
                return <strong key={pIdx} className="font-bold text-[#0B0F17]">{part.slice(1, -1)}</strong>;
              }
              return part;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-xs font-semibold text-[#0B0F17] shadow-lg hover:shadow-xl hover:border-[#0066FF]/30 transition active:scale-95 group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Tanya Asisten AI Lab</span>
            <span className="text-[#0066FF] text-[10px] font-mono font-bold bg-blue-50 px-1.5 py-0.5 rounded">24/7</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup Chat Asisten' : 'Buka Chat Asisten'}
          className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl relative ${
            isOpen
              ? 'bg-[#0B0F17] text-white rotate-90 scale-95'
              : 'bg-[#0B0F17] text-white hover:scale-105 hover:bg-black active:scale-95 border border-white/20'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-[#0066FF]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0B0F17] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Modern Frosted Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] z-50 animate-fade-in flex flex-col">
          <div className="double-bezel-shell h-full flex flex-col shadow-2xl overflow-hidden">
            <div className="double-bezel-core h-full flex flex-col bg-white overflow-hidden">
              
              {/* Header */}
              <div className="p-4 bg-[#0B0F17] text-white flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-blue-400 flex items-center justify-center text-white shadow-md">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0F17]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>FixGo AI Lab Diagnostic</span>
                      <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">
                        v2.0 Flash
                      </span>
                    </div>
                    <div className="text-[10px] text-white/60 flex items-center gap-1">
                      <span>Station Lab Tasikmalaya</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white/80 hover:text-white transition"
                    title="Mulai Percakapan Baru"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white/80 hover:text-white transition"
                    title="Tutup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#FAFAFB]">
                {messages.map((m) => (
                  <div key={m.id} className="space-y-2">
                    <div className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed shadow-sm ${
                          m.sender === 'user'
                            ? 'bg-[#0066FF] text-white font-medium rounded-br-sm'
                            : 'bg-white text-[#344054] border border-black/[0.06] rounded-bl-sm'
                        }`}
                      >
                        {m.sender === 'ai' ? (
                          renderFormattedText(m.text)
                        ) : (
                          <div>{m.text}</div>
                        )}
                        <div
                          className={`text-[9px] mt-1.5 text-right ${
                            m.sender === 'user' ? 'text-white/60' : 'text-[#98A2B3]'
                          }`}
                        >
                          {m.timestamp}
                        </div>
                      </div>
                    </div>

                    {/* Integrated Technician Handover Card */}
                    {m.showHandover && (
                      <div className="flex justify-start">
                        <div className="bg-emerald-50/90 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200/80 max-w-[88%] space-y-2.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                              <PhoneCall className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-bold text-emerald-900 text-xs">Konsultasi Langsung Teknisi Lab</div>
                              <div className="text-[10px] text-emerald-700">Outlet Tasikmalaya (Respon Cepat)</div>
                            </div>
                          </div>

                          <p className="text-[11px] text-emerald-800 leading-snug">
                            Butuh diagnosa mendalam atau penanganan darurat? Teknisi kami siap membantu langsung via WhatsApp.
                          </p>

                          <a
                            href={`https://wa.me/6285864479760?text=${encodeURIComponent(
                              'Halo Teknisi FixGo Lab Tasikmalaya, saya ingin konsultasi servis: ' +
                              (messages.filter((msg) => msg.sender === 'user').slice(-1)[0]?.text || 'Perbaikan iPhone')
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-sm"
                          >
                            <span>Chat Teknisi di WhatsApp</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-3.5 px-4 rounded-2xl bg-white text-[#475467] border border-black/[0.06] rounded-bl-sm flex items-center gap-2 shadow-sm">
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[11px] text-[#667085] font-medium ml-1">
                        Memeriksa database resmi FixGo...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Carousel */}
              <div className="px-3 py-2 bg-white border-t border-black/[0.04] flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
                {QUICK_PROMPTS.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(item.prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-black/[0.06] text-[#475467] hover:border-[#0066FF] hover:bg-blue-50/50 hover:text-[#0066FF] transition active:scale-95 text-[11px] font-medium disabled:opacity-50"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-black/[0.06] flex items-center gap-2 bg-white shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ketik pertanyaan seputar biaya / servis..."
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-black/[0.08] text-xs text-[#0B0F17] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="w-9 h-9 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
                  aria-label="Kirim Pesan"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
