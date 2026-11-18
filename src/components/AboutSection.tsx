import React from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ActivePage } from './Navbar';

interface AboutSectionProps {
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 bg-[#F3EEE6] text-[#111111] border-b border-[#795B43]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Right Column: Editorial Narrative & Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#795B43]">
                <span>01. التعريف بالشركة</span>
                <span aria-hidden="true">·</span>
                <span>{COMPANY_INFO.nameEn}</span>
              </div>

              <h2
                id="about-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {COMPANY_INFO.about.title} — {COMPANY_INFO.about.subtitle}
              </h2>

              <div className="space-y-4 pt-2 text-base sm:text-lg text-[#111111]/85 leading-relaxed">
                {COMPANY_INFO.about.paragraphs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
            </div>

            {/* 5 Defining Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {COMPANY_INFO.about.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white/85 border border-[#795B43]/20 rounded-xl p-4 transition-colors hover:border-[#F5A000]"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5A000] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-base text-[#111111]">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-[#111111]/75 mt-1 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('services', 'services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#111111] text-white font-display font-bold text-sm hover:bg-[#795B43] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>تعرف على خدماتنا السبع</span>
                <ArrowLeft className="w-4 h-4 text-[#F5A000]" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portfolio', 'portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#795B43]/40 text-[#111111] font-display font-medium text-sm hover:border-[#111111] hover:bg-white/60 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>شاهد معرض الأعمال</span>
              </button>
            </div>
          </div>

          {/* Left Column: Authentic Visual Composition */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#795B43]/25 bg-[#111111] aspect-[4/3] lg:aspect-auto lg:flex-1">
              <img
                src={COMPANY_INFO.aboutImage}
                alt="أعمال التصميم الداخلي وتنفيذ الديكور من شركة فنون للديكور والمقاولات"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <p className="text-xs text-[#F5A000] font-bold">تصميم وتنفيذ متكامل</p>
                <p className="text-sm sm:text-base font-medium mt-0.5">
                  عناية باختيار الخامات وتوزيع الإضاءة لإبراز جمال كل زاوية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-[#795B43]/25 aspect-[16/10] bg-[#111111]">
                <img
                  src={COMPANY_INFO.aboutSecondaryImage}
                  alt="تفاصيل الجداريات والتكسيات الداخلية"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl bg-[#111111] text-[#F3EEE6] p-4 flex flex-col justify-between border border-[#795B43]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#F5A000] font-bold">هوية فنون</span>
                  <img
                    src={COMPANY_INFO.logo}
                    alt="شعار فنون"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/90 mt-2">
                  نحول تطلعات عملائنا في المساحات السكنية والتجارية إلى واقع يجمع بين الأناقة والعملية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
