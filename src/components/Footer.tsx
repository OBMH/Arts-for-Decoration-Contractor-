import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICES,
  PortfolioCategoryId,
  buildWhatsAppUrl,
} from '../data/companyData';
import { ActivePage } from './Navbar';

interface FooterProps {
  onNavigate: (page: ActivePage, sectionId?: string) => void;
  onSelectPortfolioCategory: (cat: PortfolioCategoryId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectPortfolioCategory,
}) => {
  return (
    <footer
      aria-label="تذييل الموقع - فنون للديكور والمقاولات"
      className="bg-[#111111] text-[#F3EEE6] border-t border-[#795B43]/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand Identity & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.logo}
                alt="شعار فنون للديكور والمقاولات"
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-contain shrink-0"
              />
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  {COMPANY_INFO.nameAr}
                </h2>
                <p className="text-xs font-bold text-[#F5A000] tracking-wider">
                  {COMPANY_INFO.nameEn}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F3EEE6]/80 leading-relaxed">
              شركة متخصصة في أعمال التصميم والديكور الداخلي وتنفيذ الحلول الجمالية للمساحات السكنية والتجارية في جيزان – مدينة البناء. نجمع بين الأناقة والعملية وجودة التنفيذ.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#F5A000] text-white hover:text-[#111111] text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_INFO.snapchatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#F5A000] text-white hover:text-[#111111] text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Snapchat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#F5A000] hover:bg-[#F5A000]/90 text-[#111111] text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Section Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#F5A000]">
              أقسام الموقع
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home' as ActivePage, label: 'الرئيسية', sec: 'hero' },
                { id: 'about' as ActivePage, label: 'من نحن', sec: 'about' },
                { id: 'services' as ActivePage, label: 'خدماتنا', sec: 'services' },
                { id: 'portfolio' as ActivePage, label: 'أعمالنا', sec: 'portfolio' },
                { id: 'why-funun' as ActivePage, label: 'لماذا فنون؟', sec: 'why-funun' },
                { id: 'working-hours' as ActivePage, label: 'أوقات العمل', sec: 'working-hours' },
                { id: 'contact' as ActivePage, label: 'تواصل معنا', sec: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.sec}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id, link.sec);
                    }}
                    className="text-[#F3EEE6]/80 hover:text-[#F5A000] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#F5A000]">
              خدماتنا الرئيسية
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectPortfolioCategory(service.portfolioCategory)}
                    className="text-[#F3EEE6]/80 hover:text-[#F5A000] transition-colors text-right cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact, Map & Working Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-sm font-bold text-[#F5A000]">
              معلومات التواصل والدوام
            </h3>

            <div className="space-y-3 text-sm">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[#F3EEE6]/85 hover:text-[#F5A000] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#F5A000] shrink-0 mt-1" />
                <span>
                  📍 {COMPANY_INFO.locationText} (فتح خرائط Google)
                </span>
              </a>

              <div className="space-y-1.5">
                {COMPANY_INFO.phones.map((p) => (
                  <a
                    key={p.display}
                    href={p.telLink}
                    className="flex items-center gap-2.5 text-[#F3EEE6]/85 hover:text-[#F5A000] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#F5A000] shrink-0" />
                    <span className="tabular-nums font-bold">{p.display}</span>
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1 text-xs text-[#F3EEE6]/75">
                <div className="flex items-center gap-1.5 font-bold text-white mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#F5A000]" />
                  <span>أوقات العمل الرسمية:</span>
                </div>
                <p>السبت – الخميس: 9:00 صباحاً – 10:26 مساءً</p>
                <p>الجمعة: 4:30 مساءً – 10:30 مساءً</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#F3EEE6]/70">
          <p className="font-medium text-white">
            جميع الحقوق محفوظة © فنون للديكور والمقاولات
          </p>
          <p className="text-xs text-[#F3EEE6]/60">
            {COMPANY_INFO.nameAr} | {COMPANY_INFO.nameEn} – {COMPANY_INFO.locationShort}
          </p>
        </div>
      </div>
    </footer>
  );
};
