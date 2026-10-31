'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, Shield } from 'lucide-react';
import type { BackToTopData } from '../types';

interface BackToTopProps {
  data?: BackToTopData;
}

export default function BackToTop({ data }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={data?.aria_label || 'Back to top'}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#0099ff]/50 bg-[#040c1e]/90 text-[#00e5ff] shadow-[0_0_20px_rgba(0,140,255,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#00e5ff] hover:bg-gradient-to-r hover:from-[#00e5ff] hover:to-[#0052ff] hover:text-[#020712] hover:shadow-[0_0_30px_rgba(0,229,255,0.8)]"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
