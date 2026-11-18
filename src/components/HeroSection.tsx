import React, { useState } from 'react';
import { MapPin, ArrowLeft, PhoneCall, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ActivePage } from './Navbar';

interface HeroSectionProps {
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

const HERO_SCENES = [
  {
    id: 'scene-foyer',
    image: '/assets/aistudio/IMG-20261118-WA0030_d75ac8cd.jpg',
    label: 'مداخل وتكسيات فاخرة',
    caption: 'تناغم المرايا مع بديل الخشب والرخام المضيء والأسقف الجبسية',
  },
  {
    id: 'scene-living',
    image: '/assets/aistudio/IMG-20261118-WA0032_f1d6d46a.jpg',
    label: 'صالات استقبال عصرية',
    caption: 'جداريات منحوتة وتفاصيل إضاءة تمنح المكان هيبة ودفئاً',
  },
  {
    id: 'scene-wardrobe',
    image: '/assets/aistudio/IMG-20261118-WA0019_773b7855.jpg',
    label: 'خزائن وغرف ملابس',
    caption: 'واجهات زجاجية مؤطرة بالأسود مع إضاءة داخلية ذكية لكل رف',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const currentScene = HERO_SCENES[activeSceneIndex];

  return (
    <section
      id="hero"
      aria-label="الواجهة الرئيسية - فنون للديكور والمقاولات"
      className="relative min-h-[86vh] flex items-center bg-[#111111] overflow-hidden"
    >
      {/* Background Real Project Image (Pre-mounted for instant 0ms switching) */}
      <div className="absolute inset-0 z-0">
        {HERO_SCENES.map((scene, idx) => (
          <img
            key={scene.id}
            src={scene.image}
            alt={scene.caption}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="sync"
            fetchPriority={idx === 0 ? 'high' : 'auto'}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-150 ${
              idx === activeSceneIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
        {/* Measured Dark Scrim Overlay for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#111111]/92 via-[#111111]/78 to-[#111111]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column: Brand Statement & Actions */}
          <div className="lg:col-span-7 text-right space-y-6">
            {/* Brand Identity Lockup */}
            <div className="inline-flex items-center gap-3 text-sm text-[#F3EEE6]/90 border-b border-[#F5A000]/40 pb-2">
              <span className="font-bold text-[#F5A000] tracking-wide">
                {COMPANY_INFO.nameEn}
              </span>
              <span aria-hidden="true" className="text-[#795B43]">•</span>
              <span>فنون للديكور والمقاولات</span>
            </div>

            {/* Hero Headline */}
            <h1
              className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-bold text-white leading-[1.25] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {COMPANY_INFO.hero.headline}
            </h1>

            {/* Hero Marketing Description */}
            <p className="text-base sm:text-lg lg:text-xl text-[#F3EEE6]/90 leading-relaxed max-w-2xl">
              {COMPANY_INFO.hero.description}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('portfolio', 'portfolio')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#F5A000] text-[#111111] font-display font-bold text-base hover:bg-[#F5A000]/90 transition-all duration-100 shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span>استكشف أعمالنا</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact', 'contact')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/25 font-display font-medium text-base backdrop-blur-sm transition-all duration-100 cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-5 h-5 text-[#F5A000]" />
                <span>تواصل معنا</span>
              </button>
            </div>

            {/* Geographic Location & Direct Map Link (Mandatory Requirement #6) */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#F3EEE6]">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#F5A000] transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#F5A000] shrink-0" />
                <span className="font-medium">📍 {COMPANY_INFO.locationText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F5A000] opacity-80 group-hover:opacity-100" />
              </a>

              <span aria-hidden="true" className="hidden sm:inline text-white/25">|</span>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F3EEE6]/80">
                <span>للاتصال المباشر:</span>
                <a
                  href={COMPANY_INFO.phones[0].telLink}
                  className="font-bold text-white hover:text-[#F5A000] transition-colors tabular-nums"
                >
                  {COMPANY_INFO.phones[0].display}
                </a>
                <span>·</span>
                <a
                  href={COMPANY_INFO.phones[1].telLink}
                  className="font-bold text-white hover:text-[#F5A000] transition-colors tabular-nums"
                >
                  {COMPANY_INFO.phones[1].display}
                </a>
              </div>
            </div>
          </div>

          {/* Left Column: Authentic Showcase Card & Scene Switcher */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111]/80 backdrop-blur-md border border-[#795B43]/40 rounded-2xl p-4 sm:p-5 shadow-2xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111111]">
                {HERO_SCENES.map((scene, idx) => (
                  <img
                    key={scene.id}
                    src={scene.image}
                    alt={scene.label}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="sync"
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                      idx === activeSceneIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-[#F5A000] font-medium">
                      من أعمال فنون للديكور والمقاولات
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {currentScene.label}
                    </p>
                  </div>
                  <img
                    src={COMPANY_INFO.logo}
                    alt="شعار فنون للديكور"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    className="w-10 h-10 object-contain shrink-0"
                  />
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-[#F3EEE6]/80 leading-relaxed">
                {currentScene.caption}
              </p>

              {/* Scene Selector Buttons */}
              <div className="mt-4 grid grid-cols-3 gap-2" role="tablist" aria-label="نماذج من أعمالنا">
                {HERO_SCENES.map((scene, idx) => {
                  const isSelected = idx === activeSceneIndex;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveSceneIndex(idx)}
                      className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer truncate ${
                        isSelected
                          ? 'bg-[#F5A000] text-[#111111] font-bold'
                          : 'bg-white/5 text-[#F3EEE6]/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {scene.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
