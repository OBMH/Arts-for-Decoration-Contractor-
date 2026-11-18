import React from 'react';
import {
  MessageSquare,
  ClipboardCheck,
  Compass,
  Hammer,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { COMPANY_INFO, buildWhatsAppUrl } from '../data/companyData';
import { ActivePage } from './Navbar';

interface WhyChooseAndStepsProps {
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

const STEP_ICONS = [
  MessageSquare,
  ClipboardCheck,
  Compass,
  Hammer,
  CheckCircle,
];

export const WhyChooseAndSteps: React.FC<WhyChooseAndStepsProps> = ({
  onNavigate,
}) => {
  return (
    <>
      {/* Section 9: Why Choose Funun Decor (Luxury Charcoal Black Section) */}
      <section
        id="why-funun"
        aria-labelledby="why-funun-heading"
        className="py-20 sm:py-28 bg-[#111111] text-[#F3EEE6] border-b border-[#795B43]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Right Column: Title, Intro, Vision Callout & Image */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F5A000]">
                <span>04. قيمنا ومميزاتنا</span>
                <span aria-hidden="true">·</span>
                <span>{COMPANY_INFO.nameEn}</span>
              </div>

              <h2
                id="why-funun-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {COMPANY_INFO.whyChooseUs.title}
              </h2>

              <p className="text-base sm:text-lg text-[#F3EEE6]/85 leading-relaxed">
                {COMPANY_INFO.whyChooseUs.description}
              </p>

              {/* Vision Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-[#795B43]/40 space-y-2">
                <div className="text-xs font-bold text-[#F5A000]">رؤيتنا</div>
                <p className="font-display text-base sm:text-lg font-medium text-white leading-relaxed">
                  «{COMPANY_INFO.whyChooseUs.vision}»
                </p>
              </div>

              {/* Authentic Project Visual Proof */}
              <div className="relative rounded-2xl overflow-hidden border border-[#795B43]/30 aspect-[16/10] bg-[#111111]">
                <img
                  src="/assets/aistudio/IMG-20261118-WA0026_19792d45.jpg"
                  alt="تناغم التصميم والتشطيب في أعمال فنون للديكور"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-xs text-[#F3EEE6]">
                  <span>عناية بالتفاصيل من التخطيط حتى التسليم النهائي</span>
                  <span className="text-[#F5A000] font-bold">FUNUN DECOR</span>
                </div>
              </div>
            </div>

            {/* Left Column: 5 Key Differentiators */}
            <div className="lg:col-span-7 space-y-4">
              {COMPANY_INFO.whyChooseUs.items.map((item) => (
                <div
                  key={item.number}
                  className="group p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F5A000]/60 transition-all duration-150 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <span className="font-display text-2xl font-bold text-[#F5A000] tabular-nums shrink-0">
                    {item.number}.
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#F5A000] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#F3EEE6]/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Customer Journey / Work Steps (خطوات العمل) */}
      <section
        id="work-steps"
        aria-labelledby="work-steps-heading"
        className="py-20 sm:py-28 bg-white text-[#111111] border-b border-[#795B43]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#795B43]">
              <span>05. رحلة العميل</span>
              <span aria-hidden="true">·</span>
              <span>منهجية واضحة ومنظمة</span>
            </div>
            <h2
              id="work-steps-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              خطوات العمل في فنون للديكور والمقاولات
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/75 leading-relaxed">
              نرافقك خطوة بخطوة لتحويل فكرتك إلى مساحة متكاملة تجمع بين جمال التصميم ودقة التنفيذ.
            </p>
          </div>

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {COMPANY_INFO.workSteps.map((stepItem, index) => {
              const IconComponent = STEP_ICONS[index] || CheckCircle;
              return (
                <div
                  key={stepItem.step}
                  className="rounded-2xl bg-[#F3EEE6]/70 border border-[#795B43]/20 p-6 flex flex-col justify-between hover:border-[#F5A000] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#111111] text-[#F5A000] flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-display text-2xl font-bold text-[#795B43]/60 tabular-nums">
                        {stepItem.step}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#111111]">
                      {stepItem.title}
                    </h3>

                    <p className="text-sm text-[#111111]/80 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#795B43]/15 text-xs font-medium text-[#795B43]">
                    المرحلة {index + 1} من 5
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#F3EEE6] border border-[#795B43]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-right">
              <h3 className="font-display text-xl font-bold text-[#111111]">
                هل أنت جاهز للبدء بتصميم أو تنفيذ مساحتك؟
              </h3>
              <p className="text-sm sm:text-base text-[#111111]/75">
                تواصل معنا الآن لنبدأ الخطوة الأولى في تحويل فكرتك إلى واقع مميز.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5A000] hover:bg-[#F5A000]/90 text-[#111111] font-display font-bold text-sm transition-colors whitespace-nowrap"
              >
                <span>ابدأ عبر واتساب</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => onNavigate('contact', 'contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#111111] hover:bg-[#795B43] text-white font-display font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>نموذج طلب خدمة</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
