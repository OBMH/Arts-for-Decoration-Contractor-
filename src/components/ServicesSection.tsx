import React, { useState } from 'react';
import {
  Check,
  ArrowLeft,
  Eye,
  X,
  MessageCircle,
  Phone,
  Layers,
} from 'lucide-react';
import {
  SERVICES,
  ServiceItem,
  PortfolioCategoryId,
  COMPANY_INFO,
  buildWhatsAppUrl,
} from '../data/companyData';

interface ServicesSectionProps {
  onSelectPortfolioCategory: (category: PortfolioCategoryId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectPortfolioCategory,
}) => {
  // Track which photo index is active on each service card
  const [activeCardImages, setActiveCardImages] = useState<Record<string, string>>({});
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [modalImage, setModalImage] = useState<string>('');

  const handleOpenServiceModal = (service: ServiceItem) => {
    setSelectedService(service);
    setModalImage(activeCardImages[service.id] || service.coverImage);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 sm:py-28 bg-white text-[#111111] border-b border-[#795B43]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#795B43]">
              <span>02. تخصصاتنا</span>
              <span aria-hidden="true">·</span>
              <span>حلول متكاملة للمساحات السكنية والتجارية</span>
            </div>
            <h2
              id="services-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              الخدمات الرئيسية في فنون للديكور والمقاولات
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/75 leading-relaxed">
              نقدم سبع خدمات متخصصة تغطي كافة مراحل التصميم والتنفيذ والتشطيب، مع عناية دقيقة باختيار الخامات وتوزيع الإضاءة لإبراز جمال كل مساحة.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(
              'مرحباً فنون للديكور والمقاولات، أرغب بالاستفسار عن خدماتكم وطلب استشارة.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5A000] text-[#111111] font-display font-bold text-sm hover:bg-[#F5A000]/90 transition-colors shrink-0 whitespace-nowrap"
          >
            <span>استفسر عن خدمة عبر واتساب</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const currentCover = activeCardImages[service.id] || service.coverImage;
            const isFeaturedWide = index === 0; // Make the first card span 2 cols on large screens for asymmetric rhythm

            return (
              <article
                key={service.id}
                className={`group rounded-2xl bg-[#F3EEE6]/65 border border-[#795B43]/20 overflow-hidden flex flex-col justify-between transition-colors hover:border-[#F5A000] ${
                  isFeaturedWide ? 'lg:col-span-2 lg:grid lg:grid-cols-12' : ''
                }`}
              >
                {/* Image Container + Interactive Thumbnail Strip */}
                <div
                  className={`relative bg-[#111111] overflow-hidden ${
                    isFeaturedWide ? 'lg:col-span-7 min-h-[280px] sm:min-h-[340px]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={currentCover}
                    alt={`${service.title} - فنون للديكور والمقاولات`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-[#111111]/25" />

                  {/* Top Number Index */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold text-white bg-[#111111]/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/15">
                    <span className="text-[#F5A000] tabular-nums">{service.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.title}</span>
                  </div>

                  {/* Quick Expand Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenServiceModal(service)}
                    aria-label={`استعراض صور وتفاصيل خدمة ${service.title}`}
                    className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#111111]/80 hover:bg-[#F5A000] text-white hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Embedded Service Photo Switcher (Multiple real photos distributed per service) */}
                  {service.galleryImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {service.galleryImages.map((imgUrl, imgIdx) => {
                          const isSelected = currentCover === imgUrl;
                          return (
                            <button
                              key={imgUrl}
                              type="button"
                              onClick={() =>
                                setActiveCardImages((prev) => ({
                                  ...prev,
                                  [service.id]: imgUrl,
                                }))
                              }
                              aria-label={`صورة رقم ${imgIdx + 1} لخدمة ${service.title}`}
                              className={`w-11 h-8 rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                isSelected
                                  ? 'border-[#F5A000] scale-105'
                                  : 'border-white/40 opacity-75 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-[11px] text-[#F3EEE6]/90 bg-[#111111]/75 px-2 py-1 rounded tabular-nums shrink-0">
                        {service.galleryImages.length} صور
                      </span>
                    </div>
                  )}
                </div>

                {/* Service Copy & Actions */}
                <div
                  className={`p-6 flex flex-col justify-between flex-1 ${
                    isFeaturedWide ? 'lg:col-span-5' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#795B43] transition-colors">
                      {service.number}. {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#111111]/80 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-[#795B43]/15">
                      {service.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#111111]/85"
                        >
                          <Check className="w-4 h-4 text-[#F5A000] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#795B43]/15 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenServiceModal(service)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111111] hover:text-[#795B43] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Layers className="w-4 h-4 text-[#F5A000]" />
                      <span>معرض صور الخدمة ({service.galleryImages.length})</span>
                    </button>

                    <a
                      href={buildWhatsAppUrl(
                        `مرحباً فنون للديكور والمقاولات، أرغب بالاستفسار عن خدمة: ${service.title}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111111] hover:bg-[#F5A000] text-white hover:text-[#111111] text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      <span>اطلب الخدمة</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Service Detail & Dedicated Photo Gallery Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111111]/85 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-[#F3EEE6] text-[#111111] border border-[#795B43]/40 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-[#795B43]/30">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#F5A000] tabular-nums">
                  {selectedService.number}
                </span>
                <h3 id="service-modal-title" className="font-display text-lg sm:text-xl font-bold">
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="إغلاق نافذة تفاصيل الخدمة"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F5A000] text-white hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-h-[80vh] overflow-y-auto">
              {/* Gallery Column */}
              <div className="lg:col-span-7 space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#111111] border border-[#795B43]/30">
                  <img
                    src={modalImage || selectedService.coverImage}
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {selectedService.galleryImages.map((img, i) => {
                    const active = (modalImage || selectedService.coverImage) === img;
                    return (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setModalImage(img)}
                        aria-label={`عرض الصورة ${i + 1}`}
                        className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          active
                            ? 'border-[#F5A000] ring-2 ring-[#F5A000]/40'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description Column */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h4 className="font-display font-bold text-lg text-[#111111]">
                    نبذة عن الخدمة وقيمتها لمساحتك
                  </h4>
                  <p className="text-sm sm:text-base text-[#111111]/80 mt-2 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="space-y-2.5 bg-white p-4 rounded-xl border border-[#795B43]/20">
                  <h5 className="font-display font-bold text-sm text-[#795B43]">
                    أبرز ما نقدمه في هذه الخدمة:
                  </h5>
                  <ul className="space-y-2">
                    {selectedService.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-[#F5A000] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <a
                    href={buildWhatsAppUrl(
                      `مرحباً فنون للديكور والمقاولات، أرغب بطلب خدمة (${selectedService.title}) والاستفسار عن التفاصيل.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#F5A000] hover:bg-[#F5A000]/90 text-[#111111] font-display font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>اطلب هذه الخدمة عبر واتساب</span>
                  </a>

                  <a
                    href={COMPANY_INFO.phones[0].telLink}
                    className="w-full py-3 px-4 rounded-xl bg-[#111111] hover:bg-[#795B43] text-white font-display font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#F5A000]" />
                    <span className="tabular-nums">
                      اتصال مباشر: {COMPANY_INFO.phones[0].display}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const cat = selectedService.portfolioCategory;
                      setSelectedService(null);
                      onSelectPortfolioCategory(cat);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#795B43]/40 text-[#111111] hover:bg-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    استعراض المزيد في معرض الأعمال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
