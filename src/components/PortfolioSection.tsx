import React, { useState, useEffect, useMemo } from 'react';
import {
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioCategoryId,
  buildWhatsAppUrl,
} from '../data/companyData';

interface PortfolioSectionProps {
  selectedCategory: PortfolioCategoryId;
  onCategoryChange: (cat: PortfolioCategoryId) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return PORTFOLIO_ITEMS;
    }
    return PORTFOLIO_ITEMS.filter(
      (item) =>
        item.category === selectedCategory ||
        (selectedCategory === 'bedrooms' && item.tags.includes('غرف النوم'))
    );
  }, [selectedCategory]);

  // Reset lightbox if filter changes
  useEffect(() => {
    setLightboxIndex(null);
  }, [selectedCategory]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-20 sm:py-28 bg-[#F3EEE6] text-[#111111] border-b border-[#795B43]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#795B43]">
              <span>03. معرض الأعمال</span>
              <span aria-hidden="true">·</span>
              <span>نماذج حقيقية من أعمال الديكور والتصميم الداخلي</span>
            </div>
            <h2
              id="portfolio-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              معرض أعمال فنون للديكور والمقاولات
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/75 leading-relaxed">
              تصفح مجموعة مختارة من أعمالنا المصنفة حسب التخصص؛ اضغط على أي صورة لفتحها بحجم كامل في نافذة العرض ومشاهدة تفاصيل الخامات والإضاءة.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-[#795B43] font-medium tabular-nums">
            إجمالي الصور المعروضة: <strong className="text-[#111111]">{filteredItems.length}</strong> عمل
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          role="tablist"
          aria-label="تصنيفات معرض الأعمال"
          className="flex flex-wrap items-center gap-2 p-2 bg-white/80 border border-[#795B43]/20 rounded-xl mb-10"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? PORTFOLIO_ITEMS.length
                : PORTFOLIO_ITEMS.filter(
                    (item) =>
                      item.category === cat.id ||
                      (cat.id === 'bedrooms' && item.tags.includes('غرف النوم'))
                  ).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-display font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#111111] text-[#F5A000] font-bold shadow-sm'
                    : 'text-[#111111]/80 hover:bg-[#F3EEE6] hover:text-[#111111]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs tabular-nums ${
                    isActive ? 'text-[#F5A000]' : 'text-[#795B43]'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-[#795B43]/20 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#F5A000]"
            >
              {/* Image Trigger for Lightbox */}
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`فتح صورة: ${item.title} في نافذة عرض كبيرة`}
                className="relative aspect-[4/3] w-full bg-[#111111] overflow-hidden text-right cursor-pointer focus:outline-none"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-150 ${
                    item.id === 'work-09'
                      ? 'object-top scale-108 group-hover:scale-112'
                      : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Expand Icon Indicator */}
                <span className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#111111]/80 text-white group-hover:bg-[#F5A000] group-hover:text-[#111111] flex items-center justify-center transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </span>

                {/* Bottom Metadata Overlay */}
                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#F5A000] font-medium">
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#F3EEE6]/85">{item.serviceLabel}</span>
                  </div>
                </div>
              </button>

              {/* Card Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#111111] group-hover:text-[#795B43] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#111111]/75 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Unboxed Metadata Separators (Zero-Pill Rule) */}
                <div className="pt-3 border-t border-[#795B43]/15 flex items-center justify-between gap-2 text-xs text-[#795B43]">
                  <div className="flex flex-wrap items-center gap-1.5 truncate">
                    {item.tags.map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        {tIdx > 0 && <span aria-hidden="true">·</span>}
                        <span>{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="font-bold text-[#111111] hover:text-[#F5A000] transition-colors shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    عرض مكبر
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`عرض صورة: ${activeLightboxItem.title}`}
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Lightbox Bar */}
          <div
            className="max-w-7xl w-full mx-auto flex items-center justify-between text-white py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="font-bold text-[#F5A000] tabular-nums">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <span aria-hidden="true" className="text-white/30">|</span>
              <span className="text-[#F3EEE6]/90 font-medium">
                {activeLightboxItem.categoryLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="إغلاق نافذة عرض الصورة"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#F5A000] text-white hover:text-[#111111] text-sm font-bold transition-colors cursor-pointer"
            >
              <span>إغلاق</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Center Image & Navigation Controls */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button (Right in RTL) */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                )
              }
              aria-label="الصورة السابقة"
              className="absolute right-2 sm:right-4 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111111]/85 border border-white/20 hover:bg-[#F5A000] text-white hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[68vh] max-w-full object-contain rounded-xl border border-white/15 shadow-2xl"
            />

            {/* Next Button (Left in RTL) */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
              }
              aria-label="الصورة التالية"
              className="absolute left-2 sm:left-4 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111111]/85 border border-white/20 hover:bg-[#F5A000] text-white hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & WhatsApp Inquiry Bar */}
          <div
            className="max-w-5xl w-full mx-auto bg-white/10 border border-white/15 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#F5A000] font-bold">
                <span>{activeLightboxItem.serviceLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{activeLightboxItem.categoryLabel}</span>
              </div>
              <h4 className="font-display font-bold text-base sm:text-lg text-white">
                {activeLightboxItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#F3EEE6]/80">
                {activeLightboxItem.description}
              </p>
            </div>

            <a
              href={buildWhatsAppUrl(
                `مرحباً فنون للديكور والمقاولات، أعجبني تصميم (${activeLightboxItem.title}) في قسم (${activeLightboxItem.serviceLabel}) وأرغب بالاستفسار عن تنفيذ عمل مشابه.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#F5A000] hover:bg-[#F5A000]/90 text-[#111111] font-display font-bold text-xs sm:text-sm shrink-0 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>اطلب تصميماً مشابهاً عبر واتساب</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
