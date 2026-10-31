'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PortfolioSectionData, PortfolioItem } from '../../types';

interface PortfolioProps {
  data: PortfolioSectionData;
}

export default function Portfolio({ data }: PortfolioProps) {
  const items: PortfolioItem[] = data?.items || [];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <section
      id="portfolio"
      className="relative w-full pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-32 bg-[#000000] scroll-mt-24 text-white"
    >
      {/* Subtle ambient cyan glow in background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#00f0ff]/[0.03] blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-4 mb-3 sm:mb-4">
            <span className="w-9 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-[#0052ff] to-[#00e5ff]" />
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#00e5ff] uppercase drop-shadow-[0_0_10px_rgba(0,140,255,0.4)]">
              {data.eyebrow || 'PROVEN TRACK RECORD'}
            </span>
            <span className="w-9 sm:w-12 h-[2px] bg-gradient-to-l from-transparent via-[#0052ff] to-[#00e5ff]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.2] mb-4">
            <span>{data.title_regular || 'Mission-Critical'} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] drop-shadow-[0_0_20px_rgba(0,140,255,0.45)]">
              {data.title_highlight || 'Case Studies'}
            </span>
          </h2>

          {data.description && (
            <p className="text-[14px] sm:text-[15.5px] leading-[1.65] text-[#cbd5e1] font-light max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* 2x2 Project Grid for 4 Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 lg:gap-9">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-2xl bg-[#030918] border border-[#0052ff]/35 shadow-[0_0_20px_rgba(0,82,255,0.18)] hover:border-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,140,255,0.35)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Image: Aspect 1.88/1 with crisp zoom on hover */}
              <div className="relative w-full aspect-[1.88/1] overflow-hidden bg-black shrink-0">
                <Image
                  src={item.image}
                  alt={item.image_alt || item.title}
                  fill
                  priority={index < 2}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Card Body */}
              <div className="px-6 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-7 flex flex-col flex-1 bg-[#030918]">
                {/* Category */}
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.1em] text-[#00e5ff] uppercase mb-2 block">
                  {item.category}
                </span>

                {/* Project Title */}
                <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug mb-2.5 transition-colors group-hover:text-[#00e5ff]">
                  <Link
                    href={item.link_href}
                    onClick={(e) => handleLinkClick(e, item.link_href)}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </h3>

                {/* Project Description */}
                <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#cbd5e1] font-light mb-6 flex-1 line-clamp-2">
                  {item.description}
                </p>

                {/* View Project Action Row */}
                <div className="mt-auto pt-1">
                  <Link
                    href={item.link_href}
                    onClick={(e) => handleLinkClick(e, item.link_href)}
                    className="inline-flex items-center gap-3.5 group/btn"
                  >
                    <span className="text-sm sm:text-[15px] font-bold text-[#00e5ff] transition-colors group-hover/btn:text-white">
                      {item.link_text || 'View Details'}
                    </span>
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#00e5ff] to-[#0052ff] text-[#020712] shadow-[0_0_12px_rgba(0,140,255,0.45)] transition-all duration-300 group-hover/btn:brightness-110 group-hover/btn:scale-110">
                      <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5] text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}