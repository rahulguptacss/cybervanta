'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Database,
  Cloud,
  Settings,
} from 'lucide-react';
import type { HeroSectionData } from '../../types';

interface HeroProps {
  data: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'shield':
      case 'shieldcheck':
      case 'network':
        return <ShieldCheck className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-[#00e5ff]" />;
      case 'camera':
      case 'cctv':
      case 'surveillance':
        return (
          <svg
            className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-[#00e5ff]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        );
      case 'database':
      case 'data':
        return <Database className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-[#00e5ff]" />;
      case 'cloud':
      case 'cloudsecurity':
        return <Cloud className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-[#00e5ff]" />;
      case 'settings':
      case 'cog':
      case 'consulting':
      default:
        return <Settings className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-[#00e5ff]" />;
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] lg:h-screen lg:max-h-[1080px] pt-24 sm:pt-28 lg:pt-20 pb-12 lg:pb-6 bg-[#020712] text-white overflow-hidden scroll-mt-20 flex items-center select-none"
    >
      {/* 1. Cyber Ambient Glowing Lights & City Horizon Overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 229, 255, 0.12) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 229, 255, 0.12) 1px, transparent 1px)`,
            backgroundSize: '3.5rem 3.5rem',
          }}
        />

        {/* Ambient Glowing Spotlights matching CyberVanta Logo (GPU optimized radial gradients) */}
        <div className="absolute top-1/4 -left-32 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,82,255,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.14)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,82,255,0.1)_0%,transparent_70%)] pointer-events-none" />

        {/* Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#020712]/50 to-[#020712]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Flex layout: flex-col-reverse ensures Video is rendered FIRST on mobile, and Content is FIRST (left) on desktop */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10 xl:gap-12 w-full">
          
          {/* Left Column (Desktop) / Bottom Column (Mobile): Eyebrow, Main Headline, Description, 4 Features, CTA Button */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Top Eyebrow: PROTECT • DETECT • PREVENT */}
            <div className="mb-2.5 sm:mb-3">
              <p className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00e5ff] uppercase drop-shadow-[0_0_12px_rgba(0,132,255,0.5)]">
                {data.eyebrow || 'PROTECT • DETECT • PREVENT'}
              </p>
            </div>

            {/* Main Headline: SECURING YOUR DIGITAL TOMORROW (2-Line Balanced Layout) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-[950] tracking-tight leading-[1.08] mb-3.5 sm:mb-4 uppercase">
              <span className="text-white block">
                {data.title_line1 || 'SECURING'}{data.title_line2 ? ` ${data.title_line2}` : ''}
              </span>
              <span className="block mt-1 sm:mt-1.5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#00a6ff] to-[#0052ff] drop-shadow-[0_0_25px_rgba(0,166,255,0.65)]">
                  {data.title_highlight || 'DIGITAL'}{' '}
                </span>
                <span className="text-white">
                  {data.title_line3 || 'TOMORROW'}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-[15px] font-normal leading-relaxed max-w-xl mb-5 sm:mb-6">
              {data.description ||
                'CyberVanta delivers advanced digital security solutions to protect your business, data, and people from evolving threats.'}
            </p>

            {/* 4 Feature Cards Row */}
            {data.features && data.features.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-7">
                {data.features.slice(0, 4).map((feat) => (
                  <div
                    key={feat.id}
                    className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl border border-[#0052ff]/35 bg-[#040e24] transition-all duration-200 hover:border-[#00e5ff] hover:bg-[#0052ff]/20 hover:shadow-[0_0_20px_rgba(0,132,255,0.35)] group shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                  >
                    <div className="mb-2 p-1.5 rounded-lg bg-gradient-to-br from-[#0052ff]/25 to-[#00e5ff]/20 text-[#00e5ff] transition-transform duration-200 group-hover:scale-110 shadow-[0_0_10px_rgba(0,132,255,0.3)]">
                      {getFeatureIcon(feat.icon)}
                    </div>
                    <span className="text-[11px] sm:text-[12px] font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action CTA Button */}
            <div className="flex items-center">
              {/* Primary CTA: Get Started */}
              <Link
                href={data.cta_link || '#contact'}
                onClick={(e) => handleLinkClick(e, data.cta_link || '#contact')}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] hover:brightness-110 px-7 sm:px-8 py-3.5 text-sm sm:text-base font-extrabold text-[#020712] shadow-[0_0_25px_rgba(0,180,255,0.55)] hover:shadow-[0_0_35px_rgba(0,229,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
              >
                <span>{data.cta_text || 'Get Started'}</span>
                <span className="w-6 h-6 rounded-full bg-[#020712] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </span>
              </Link>
            </div>

          </div>

          {/* Right Column (Desktop) / Top Column (Mobile): 3D Holographic Cyber Defense Video Showcase */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center">
            <div className="relative w-full max-w-[560px] xl:max-w-[600px] flex items-center justify-center group transform-gpu transition-transform duration-300 hover:scale-[1.015]">
              {data.video ? (
                <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[410px] xl:h-[440px] rounded-3xl overflow-hidden border-2 border-[#0099ff]/40 bg-[#020712] shadow-[0_0_45px_rgba(0,102,255,0.35)]">
                  <video
                    src={data.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Vignette & Glow Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020712]/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
                </div>
              ) : (
                <div className="relative w-full aspect-[574/576]">
                  <Image
                    src={data.image || '/images/hero-shield-3d.png'}
                    alt={data.image_alt || 'CyberVanta 3D Security Shield & Globe'}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.35)] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
