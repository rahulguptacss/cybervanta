'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import type { AboutSectionData } from '../../types';

interface AboutProps {
  data: AboutSectionData;
  showButton?: boolean;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="relative w-full pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 bg-[#000000] overflow-hidden scroll-mt-24">
      {/* Ambient background cyber glow */}
      <div
        className="pointer-events-none absolute top-1/2 -left-40 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cyber Robotic Hand with Neon Border & Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div
              className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border-2 border-[#0099ff]/50 shadow-[0_0_35px_rgba(0,132,255,0.35)] bg-[#030917] group transform-gpu transition-all duration-300 hover:scale-[1.02] hover:border-[#00e5ff] hover:shadow-[0_0_55px_rgba(0,180,255,0.55)]"
            >
              {/* Robotic Hand Image */}
              <Image
                src={data.image || '/images/about-cybervanta.webp'}
                alt={data.image_alt || 'Establish and maintain complete digital security'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Subtle Ambient Radial Glow on image center */}
              <div
                className="pointer-events-none absolute top-[35%] right-[25%] h-36 w-36 rounded-full bg-cyan-400/20 blur-xl animate-pulse z-10"
                aria-hidden="true"
              />

              {/* Floating "Secure Protection" Badge with Levitation Animation */}
              <div className="absolute bottom-5 right-5 z-20">
                <div
                  className="flex flex-col items-center text-center rounded-2xl border border-[#0052ff]/40 bg-[#050c1e] px-5 py-5 shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-[#00e5ff] hover:shadow-[0_0_25px_rgba(0,132,255,0.45)]"
                >
                  {/* Glowing Shield Check Icon */}
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052ff]/30 to-[#00e5ff]/20 border border-[#00e5ff]/40 text-[#00e5ff] mb-2.5 shadow-[0_0_12px_rgba(0,140,255,0.4)]">
                    <span className="absolute inset-0 rounded-xl bg-[#00e5ff]/20 animate-ping opacity-60" />
                    <ShieldCheck className="relative z-10 h-6 w-6 text-[#00e5ff]" />
                  </div>
                  {/* Badge Title */}
                  <h4 className="text-[14.5px] font-bold text-white tracking-wide leading-tight mb-1">
                    {data.badge?.title || '99.99% SECURE'}
                  </h4>
                  {/* Badge Subtitle */}
                  <p className="text-[11.5px] text-slate-400 max-w-[130px] leading-tight">
                    {data.badge?.subtitle || 'Active Zero-Trust Telemetry'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Staggered Content Reveal */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tagline: Single Cyan-Blue Line on left + ABOUT US */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] w-10 bg-gradient-to-r from-[#0052ff] to-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff] origin-left"
              />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#00e5ff] uppercase">
                {data.eyebrow || 'ABOUT US'}
              </span>
            </motion.div>

            {/* Headline with Staggered Slide-Up */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-[1.18] tracking-tight mb-6"
            >
              <span>{data.title_regular} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] drop-shadow-[0_0_15px_rgba(0,140,255,0.45)]">
                {data.title_highlight}
              </span>
            </motion.h2>

            {/* Paragraph Description Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal max-w-lg"
            >
              {data.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
