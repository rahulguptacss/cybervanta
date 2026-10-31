'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { WhyChooseUsSectionData, WhyChooseUsFeature } from '../../types';

interface WhyChooseUsProps {
  data: WhyChooseUsSectionData;
}

const renderFeatureIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'handshake':
    case 'certified':
    case 'experts':
      // Handshake / Certified security partnership icon
      return (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#00e5ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13 11.6" />
          <path d="m13 11.6-2.3-2.3a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4 0l1.6-1.6" />
          <path d="M18 11V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
          <path d="M14 2v4" />
          <path d="M8 2v4" />
        </svg>
      );
    case 'cpu':
    case 'ai':
    case 'threat':
    case 'detection':
      // AI / Neural threat telemetry sensor icon
      return (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#00e5ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.5" fill="#00e5ff" />
        </svg>
      );
    default:
      // Shield with check
      return (
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#00e5ff]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
};

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  if (!data) return null;

  return (
    <section
      id="why-choose-us"
      className="relative w-full pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 bg-[#000000] overflow-hidden text-white scroll-mt-24"
    >
      {/* Background ambient cyber glow matching logo theme */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,153,255,0.08),rgba(0,82,255,0.03),transparent_70%)] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[450px] w-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.07),rgba(0,82,255,0.03),transparent_70%)] blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* ================================================================= */}
          {/* LEFT COLUMN: Large High-Tech SOC Analyst Photo matching screenshot */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Backing Glow on Image */}
            <div className="pointer-events-none absolute -inset-2 sm:-inset-3 rounded-[32px] bg-gradient-to-tr from-[#0052ff]/20 via-[#0099ff]/10 to-[#00e5ff]/20 blur-xl opacity-75" />

            {/* Main Rounded Image Container */}
            <div className="group relative w-full aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4.2] xl:aspect-[4/4.4] rounded-[24px] sm:rounded-[30px] overflow-hidden border-2 border-[#0099ff]/50 bg-[#020712] shadow-[0_0_35px_rgba(0,102,255,0.25)] transition-all duration-500 hover:border-[#00e5ff] hover:shadow-[0_0_45px_rgba(0,229,255,0.45)]">
              <Image
                src={data.image || '/images/why-choose-cybervanta.webp'}
                alt={data.image_alt || 'Why Choose CyberVanta'}
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />

              {/* High-tech Vignette / Cyber Grid Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020712]/70 via-transparent to-transparent" />
              
              {/* Corner Tech Accent Marks */}
              <div className="pointer-events-none absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff] opacity-80" />
              <div className="pointer-events-none absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff] opacity-80" />
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Eyebrow, Heading, Features, CTA & Social Proof     */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* 1. Eyebrow: — WHY CHOOSE CYBERVANTA */}
            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-8 sm:w-10 h-[2px] bg-gradient-to-r from-[#0052ff] to-[#00e5ff] rounded-full shadow-[0_0_6px_#00e5ff]" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#00e5ff] uppercase drop-shadow-[0_0_10px_rgba(0,140,255,0.4)]">
                {data.eyebrow || 'WHY CHOOSE CYBERVANTA'}
              </span>
            </div>

            {/* 2. Main Heading: Your Trusted Cyber Security Partner for Modern Businesses */}
            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] xl:text-[44px] font-extrabold text-white tracking-tight leading-[1.18] mb-4 sm:mb-5">
              <span>{data.title_regular} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] drop-shadow-[0_0_20px_rgba(0,140,255,0.45)]">
                {data.title_highlight}
              </span>
            </h2>

            {/* 3. Description Paragraph */}
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#cbd5e1] font-light mb-7 sm:mb-8 max-w-xl">
              {data.description}
            </p>

            {/* 4. Features List */}
            <div className="space-y-6 sm:space-y-7">
              {data.features?.map((feature: WhyChooseUsFeature, idx: number) => {
                const isLast = idx === (data.features?.length ?? 0) - 1;

                return (
                  <div key={feature.id || feature.title} className="group">
                    <div className="flex items-start justify-between gap-4 sm:gap-5">
                      {/* Left: Soft Squircle Icon Box */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#0052ff]/20 via-[#040e24] to-[#020714] border border-[#0099ff]/50 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(0,140,255,0.25)] transition-all duration-300 group-hover:border-[#00e5ff] group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.5)]">
                        {renderFeatureIcon(feature.icon || feature.title)}
                      </div>

                      {/* Middle: Feature Title & Description */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-[19px] font-bold text-white tracking-tight mb-1 sm:mb-1.5 transition-colors duration-200 group-hover:text-[#00e5ff]">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#cbd5e1] font-light">
                          {feature.description}
                        </p>
                      </div>

                      {/* Right Accent Pill / Checkmark ring on 2nd feature */}
                      {idx === 1 && (
                        <div className="hidden sm:flex w-8 h-8 rounded-full border border-[#0099ff]/40 bg-[#020712] items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,140,255,0.2)]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                        </div>
                      )}
                    </div>

                    {/* Divider between feature 1 and feature 2 matching screenshot */}
                    {!isLast && (
                      <div className="h-px w-full bg-gradient-to-r from-[#0052ff]/30 via-[#0099ff]/25 to-transparent mt-6 sm:mt-7" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

