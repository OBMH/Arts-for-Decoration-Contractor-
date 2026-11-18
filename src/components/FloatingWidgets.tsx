import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  X,
  Send,
  Trash2,
  Phone,
  MapPin,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import {
  COMPANY_INFO,
  PortfolioCategoryId,
  buildWhatsAppUrl,
} from '../data/companyData';
import {
  SUGGESTED_QUESTIONS,
  AssistantAction,
} from '../data/knowledgeBase';
import {
  analyzeAndAnswerQuestion,
  AssistantResponse,
} from '../utils/assistantEngine';
import { ActivePage } from './Navbar';

interface FloatingWidgetsProps {
  onNavigate: (page: ActivePage, sectionId?: string) => void;
  onSelectPortfolioCategory: (cat: PortfolioCategoryId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  bulletPoints?: string[];
  actions?: AssistantAction[];
  timestamp: string;
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  sender: 'assistant',
  text: 'مرحباً بك في فنون للديكور والمقاولات، كيف يمكننا مساعدتك اليوم؟',
  bulletPoints: [
    'اسألني عن خدماتنا السبع (الديكور الداخلي، الشاشات الجدارية، الخزائن، المحلات، الأسقف الجبسية، والدهانات).',
    'استفسر عن موقعنا في جيزان – مدينة البناء أو أوقات العمل الرسمية.',
    'احصل على أرقام التواصل المباشر ورابط واتساب ومعرض الأعمال.',
  ],
  actions: [
    { type: 'navigate_portfolio', label: 'استكشف معرض الأعمال', targetSection: 'portfolio' },
    { type: 'whatsapp', label: 'تواصل عبر واتساب', url: buildWhatsAppUrl() },
  ],
  timestamp: 'الآن',
};

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  onNavigate,
  onSelectPortfolioCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isProcessing]);

  const handleAskQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: 'الآن',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    // Local synchronous engine with a short 160ms UI feedback delay
    window.setTimeout(() => {
      const result: AssistantResponse = analyzeAndAnswerQuestion(trimmed);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: result.answer,
        bulletPoints: result.bulletPoints,
        actions: result.actions,
        timestamp: 'الآن',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsProcessing(false);
    }, 160);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setInputValue('');
  };

  const handleActionClick = (action: AssistantAction) => {
    if (action.type === 'navigate_portfolio') {
      if (action.portfolioCategory) {
        onSelectPortfolioCategory(action.portfolioCategory as PortfolioCategoryId);
      } else {
        onNavigate('portfolio', 'portfolio');
      }
      setIsOpen(false);
    } else if (action.type === 'navigate_services') {
      onNavigate('services', 'services');
      setIsOpen(false);
    } else if (action.type === 'navigate_contact') {
      onNavigate('contact', 'contact');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 1. Floating WhatsApp Button (Bottom Left - Mandatory Requirement #12) */}
      <a
        href={buildWhatsAppUrl(COMPANY_INFO.whatsappDefaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        title="تواصل معنا عبر واتساب"
        className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current"
          aria-hidden="true"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" />
        </svg>
      </a>

      {/* 2. Local Smart Assistant Trigger Button (Bottom Right - Mandatory Requirement #13) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'إغلاق مساعد فنون الذكي' : 'فتح مساعد فنون الذكي'}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#111111] hover:bg-[#1a1a1a] text-white border-2 border-[#F5A000] shadow-2xl transition-transform duration-200 hover:scale-103 cursor-pointer"
      >
        <img
          src={COMPANY_INFO.logo}
          alt=""
          referrerPolicy="no-referrer"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
        />
        <span className="font-display font-bold text-xs sm:text-sm text-[#F5A000] whitespace-nowrap">
          مساعد فنون الذكي
        </span>
        {isOpen ? (
          <X className="w-4 h-4 text-white" />
        ) : (
          <MessageSquareText className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Local Smart Assistant Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="نافذة محادثة مساعد فنون الذكي"
          className="fixed bottom-22 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[78vh] bg-[#F3EEE6] text-[#111111] rounded-2xl border-2 border-[#795B43]/40 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-[#111111] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#795B43]/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src={COMPANY_INFO.logo}
                alt="شعار فنون للديكور"
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain shrink-0"
              />
              <div>
                <h3 className="font-display font-bold text-sm text-[#F5A000]">
                  مساعد فنون الذكي
                </h3>
                <p className="text-[11px] text-[#F3EEE6]/80">
                  فنون للديكور والمقاولات • جيزان
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleClearChat}
                aria-label="مسح المحادثة"
                title="مسح المحادثة"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#F3EEE6] text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">مسح</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق المحادثة"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#F5A000] text-white hover:text-[#111111] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#111111] text-white rounded-tr-xs'
                        : 'bg-white text-[#111111] border border-[#795B43]/25 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.bulletPoints && msg.bulletPoints.length > 0 && (
                      <ul className="mt-2.5 pt-2.5 border-t border-[#795B43]/15 space-y-1.5 text-xs sm:text-sm text-[#111111]/85">
                        {msg.bulletPoints.map((bp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#F5A000] font-bold">•</span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Interactive Action Links / Buttons inside Assistant Reply */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#795B43]/15 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, idx) => {
                          if (act.url) {
                            const isTel = act.url.startsWith('tel:');
                            return (
                              <a
                                key={idx}
                                href={act.url}
                                target={isTel ? undefined : '_blank'}
                                rel={isTel ? undefined : 'noopener noreferrer'}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                  act.type === 'whatsapp'
                                    ? 'bg-[#F5A000] text-[#111111] hover:bg-[#F5A000]/90'
                                    : 'bg-[#111111] text-white hover:bg-[#795B43]'
                                }`}
                              >
                                {act.type === 'maps' && <MapPin className="w-3.5 h-3.5 text-[#F5A000]" />}
                                {(act.type === 'call_primary' || act.type === 'call_secondary') && (
                                  <Phone className="w-3.5 h-3.5 text-[#F5A000]" />
                                )}
                                <span>{act.label}</span>
                                {!isTel && <ExternalLink className="w-3 h-3" />}
                              </a>
                            );
                          }

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3EEE6] hover:bg-[#F5A000] text-[#111111] border border-[#795B43]/30 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-[#795B43] font-medium px-2">
                <span>جاري تجهيز الإجابة...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Bar */}
          <div className="px-3 py-2 bg-white/75 border-t border-[#795B43]/20 shrink-0">
            <p className="text-[11px] font-bold text-[#795B43] mb-1.5">
              أسئلة شائعة (اضغط للسؤال السريع):
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleAskQuestion(q)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#F3EEE6] hover:bg-[#F5A000] text-[#111111] border border-[#795B43]/25 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuestion(inputValue);
            }}
            className="p-3 bg-white border-t border-[#795B43]/25 flex items-center gap-2 shrink-0"
          >
            <label htmlFor="assistant-input" className="sr-only">
              اكتب سؤالك لمساعد فنون الذكي
            </label>
            <input
              id="assistant-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="اكتب سؤالك هنا (مثال: وين موقعكم؟)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F3EEE6] border border-[#795B43]/30 focus:border-[#F5A000] text-sm text-[#111111] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="إرسال السؤال"
              disabled={!inputValue.trim() || isProcessing}
              className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#F5A000] disabled:opacity-40 text-white hover:text-[#111111] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
