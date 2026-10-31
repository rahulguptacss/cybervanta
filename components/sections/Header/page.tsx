'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Activity,
  Lock,
  Radio,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll detection for sticky header and active onepage section spy (throttled with rAF)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sectionIds = ['home', 'about', 'services', 'why-choose-us', 'soc', 'process', 'portfolio', 'contact'];
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 180) {
                setActiveSection(sectionIds[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const touchStartY = useRef<number | null>(null);

  // Close mobile drawer on Escape key and window resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHeaderTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null) {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      // Drag down from mobile header bar by > 40px opens the menu
      if (deltaY > 40 && !mobileMenuOpen) {
        setMobileMenuOpen(true);
      } else if (deltaY < -40 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      touchStartY.current = null;
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      return activeSection === id;
    }
    return pathname === href;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      onTouchStart={handleHeaderTouchStart}
      onTouchEnd={handleHeaderTouchEnd}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/20 py-1.5 sm:py-2 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-[#040812] py-2 sm:py-2.5 border-b border-slate-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[58px] sm:min-h-[62px]">
          
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center shrink-0 group py-0"
          >
            <div className="relative h-12 sm:h-14 lg:h-15 w-52 sm:w-64 lg:w-76 transition-transform duration-200 group-hover:scale-[1.03] origin-left">
              <Image
                src={data.logo || '/logo/logo.webp'}
                alt={`${data.logo_text} ${data.logo_subtext}`}
                fill
                priority
                className="object-contain object-left scale-[1.18] sm:scale-[1.24] lg:scale-[1.3] origin-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {data.links.map((link: NavItem) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group relative flex items-center py-1"
                >
                  <span
                    className={`text-[14px] xl:text-[15px] font-medium transition-colors duration-200 ${
                      active
                        ? 'text-[#00e5ff] font-semibold drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]'
                        : 'text-slate-200 hover:text-[#00e5ff]'
                    }`}
                  >
                    {link.name}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="active-nav-line"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052ff] to-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: CTA Button */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {data.button_text && (
              <Link
                href={data.button_link || '#contact'}
                onClick={(e) => handleLinkClick(e, data.button_link || '#contact')}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] px-6 py-2.5 text-[14px] font-extrabold text-[#020712] shadow-[0_0_20px_rgba(0,180,255,0.5)] transform-gpu transition-all duration-200 ease-out hover:shadow-[0_0_32px_rgba(0,229,255,0.8)] hover:brightness-110 active:scale-95"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1 text-[#020712]" />
              </Link>
            )}
          </div>

          {/* Mobile Right Controls: CTA + Toggle */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
            {data.button_text && (
              <Link
                href={data.button_link || '#contact'}
                onClick={(e) => handleLinkClick(e, data.button_link || '#contact')}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] px-3 sm:px-4 py-1.5 sm:py-2 text-[11.5px] sm:text-[13px] font-extrabold text-[#020712] shadow-[0_0_14px_rgba(0,180,255,0.45)] transition-all active:scale-95 whitespace-nowrap"
              >
                <span>{data.button_text}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#020712]" />
              </Link>
            )}

            {/* Animated Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? data.close_aria_label : data.menu_aria_label}
              aria-expanded={mobileMenuOpen}
              className="relative flex h-9.5 w-9.5 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-[#050c18] text-white hover:text-[#00e5ff] hover:border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all active:scale-90 focus:outline-none shrink-0"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-5 w-5 text-[#00e5ff]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-5 w-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>

        {/* Subtle Mobile Drag Indicator on bottom of Header */}
        <div className="flex lg:hidden justify-center pb-1 -mt-1 pointer-events-none">
          <span className="h-1 w-8 rounded-full bg-cyan-400/25" />
        </div>
      </div>

      {/* Mobile Navigation Drawer with Touch Drag Support (mobile header se drag hoga) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              className="lg:hidden fixed inset-0 top-[58px] sm:top-[64px] bg-[#020712]/80 backdrop-blur-[6px] z-40"
            />

            {/* Draggable panel from top */}
            <motion.div
              key="mobile-drawer"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.35, bottom: 0.65 }}
              onDragEnd={(_, info) => {
                // Drag down or up to dismiss
                if (info.offset.y > 60 || info.velocity.y > 250 || info.offset.y < -50 || info.velocity.y < -250) {
                  setMobileMenuOpen(false);
                }
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="lg:hidden absolute left-0 right-0 top-full z-50 overflow-hidden bg-[#040914]/98 backdrop-blur-2xl border-b border-cyan-500/25 shadow-[0_25px_50px_rgba(0,0,0,0.95)] rounded-b-2xl cursor-grab active:cursor-grabbing select-none"
            >
              {/* Tactile Mobile Drag Pill Handle */}
              <div className="flex flex-col items-center justify-center pt-3 pb-1.5 select-none cursor-grab active:cursor-grabbing">
                <span className="h-1.5 w-14 rounded-full bg-cyan-400/60 shadow-[0_0_10px_rgba(0,229,255,0.5)] transition-all hover:bg-cyan-400" />
                <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest mt-1 font-semibold uppercase">
                  {data.drag_hint || 'Drag down to close'}
                </span>
              </div>

              <div className="px-5 py-4 space-y-3 max-h-[calc(100vh-140px)] overflow-y-auto">
                <nav className="flex flex-col space-y-1">
                  {data.links.map((link: NavItem, idx: number) => {
                    const active = isActive(link.href);

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 * idx, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[15px] font-medium transition-colors ${
                            active
                              ? 'bg-cyan-500/15 text-[#00e5ff] font-semibold border-l-2 border-[#00e5ff]'
                              : 'text-slate-200 hover:text-[#00e5ff] hover:bg-white/[0.04]'
                          }`}
                        >
                          <span>{link.name}</span>
                          {active && (
                            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile CTA */}
                {data.button_text && (
                  <div className="pt-2">
                    <Link
                      href={data.button_link || '#contact'}
                      onClick={(e) => handleLinkClick(e, data.button_link || '#contact')}
                      className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] px-6 py-3 text-[14px] font-extrabold text-[#020712] shadow-[0_0_20px_rgba(0,180,255,0.45)] transition-all active:scale-[0.98]"
                    >
                      <span>{data.button_text}</span>
                      <ArrowRight className="h-4 w-4 text-[#020712]" />
                    </Link>
                  </div>
                )}

                {/* Drag Dismiss Bottom Footer */}
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center pt-2 pb-1 cursor-pointer text-[11px] text-cyan-400/50 hover:text-cyan-300 border-t border-cyan-950/60"
                >
                  <span>▲ Drag or tap here to close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}