import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/companyData';

export type ActivePage =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'why-funun'
  | 'working-hours'
  | 'contact';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

const NAV_ITEMS: { id: ActivePage; label: string; sectionId: string }[] = [
  { id: 'home', label: 'الرئيسية', sectionId: 'hero' },
  { id: 'about', label: 'من نحن', sectionId: 'about' },
  { id: 'services', label: 'خدماتنا', sectionId: 'services' },
  { id: 'portfolio', label: 'أعمالنا', sectionId: 'portfolio' },
  { id: 'why-funun', label: 'لماذا فنون؟', sectionId: 'why-funun' },
  { id: 'working-hours', label: 'أوقات العمل', sectionId: 'working-hours' },
  { id: 'contact', label: 'تواصل معنا', sectionId: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: { id: ActivePage; sectionId: string }) => {
    setMobileMenuOpen(false);
    onNavigate(item.id, item.sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#795B43]/30 shadow-lg'
          : 'bg-[#111111] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Lockup (Logo + Single-line Brand Title) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick({ id: 'home', sectionId: 'hero' });
          }}
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
          aria-label="فنون للديكور والمقاولات - الرئيسية"
        >
          <img
            src={COMPANY_INFO.logo}
            alt="شعار فنون للديكور والمقاولات FUNUN DECOR"
            referrerPolicy="no-referrer"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display text-base sm:text-lg font-bold text-white tracking-tight whitespace-nowrap shrink-0 group-hover:text-[#F5A000] transition-colors">
            {COMPANY_INFO.nameAr}
          </span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="القائمة الرئيسية"
          className="hidden lg:flex items-center gap-6 xl:gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#F5A000] font-bold'
                    : 'text-[#F3EEE6]/85 hover:text-[#F5A000]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 right-0 left-0 h-0.5 bg-[#F5A000] transition-transform duration-200 origin-right ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-[#111111] bg-[#F5A000] hover:bg-[#F5A000]/90 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            اطلب استشارة
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 text-[#F3EEE6] hover:text-[#F5A000] hover:border-[#F5A000]/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-[#795B43]/30 px-4 pt-4 pb-6 shadow-2xl">
          <nav aria-label="قائمة الجوال" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#F5A000]/15 text-[#F5A000] font-bold'
                      : 'text-[#F3EEE6] hover:bg-white/5 hover:text-[#F5A000]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#F5A000]">•</span>}
                </a>
              );
            })}
          </nav>

          <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-[#F3EEE6]/75 px-2">
              <MapPin className="w-4 h-4 text-[#F5A000] shrink-0" />
              <span>{COMPANY_INFO.locationText}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={COMPANY_INFO.phones[0].telLink}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#F5A000]" />
                <span className="tabular-nums">{COMPANY_INFO.phones[0].display}</span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#F5A000] text-[#111111] text-sm font-bold hover:bg-[#F5A000]/90 transition-colors whitespace-nowrap"
              >
                <span>تواصل واتساب</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
