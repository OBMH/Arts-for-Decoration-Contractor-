/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, ActivePage } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyChooseAndSteps } from './components/WhyChooseAndSteps';
import { WorkingHoursAndContact } from './components/WorkingHoursAndContact';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { PortfolioCategoryId } from './data/companyData';

const SECTION_TO_PAGE: Record<string, ActivePage> = {
  hero: 'home',
  about: 'about',
  services: 'services',
  portfolio: 'portfolio',
  'why-funun': 'why-funun',
  'working-hours': 'working-hours',
  contact: 'contact',
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] =
    useState<PortfolioCategoryId>('all');

  const handleNavigate = useCallback((page: ActivePage, sectionId?: string) => {
    setActivePage(page);
    const targetId = sectionId || (page === 'home' ? 'hero' : page);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleSelectPortfolioCategory = useCallback(
    (category: PortfolioCategoryId) => {
      setSelectedPortfolioCategory(category);
      setActivePage('portfolio');
      const el = document.getElementById('portfolio');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  // Observe visible sections to keep the navigation highlight in sync on scroll
  useEffect(() => {
    const sectionIds = Object.keys(SECTION_TO_PAGE);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const page = SECTION_TO_PAGE[entry.target.id];
            if (page) {
              setActivePage(page);
            }
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F3EEE6] text-[#111111]">
      {/* Sticky Luxury Header */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 2. About Us Section (من نحن) */}
        <AboutSection onNavigate={handleNavigate} />

        {/* 3. Main Services Section (الخدمات الرئيسية السبع) */}
        <ServicesSection
          onSelectPortfolioCategory={handleSelectPortfolioCategory}
        />

        {/* 4. Portfolio Gallery Section (معرض الأعمال) */}
        <PortfolioSection
          selectedCategory={selectedPortfolioCategory}
          onCategoryChange={setSelectedPortfolioCategory}
        />

        {/* 5. Why Choose Funun & 5 Customer Journey Steps (لماذا فنون + خطوات العمل) */}
        <WhyChooseAndSteps onNavigate={handleNavigate} />

        {/* 6. Official Working Hours & Contact Us Section (أوقات العمل + تواصل معنا) */}
        <WorkingHoursAndContact />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectPortfolioCategory={handleSelectPortfolioCategory}
      />

      {/* Floating WhatsApp Button & Local Smart Assistant («مساعد فنون الذكي») */}
      <FloatingWidgets
        onNavigate={handleNavigate}
        onSelectPortfolioCategory={handleSelectPortfolioCategory}
      />
    </div>
  );
}
