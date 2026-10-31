import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header/page';
import Hero from '../components/sections/Hero/page';
import About from '../components/sections/About/page';
import SocBanner from '../components/sections/SocBanner/page';
import Services from '../components/sections/Services/page';
import WhyChooseUs from '../components/sections/WhyChooseUs/page';
import Process from '../components/sections/Process/page';
import Portfolio from '../components/sections/Portfolio/page';
import Contact from '../components/sections/Contact/page';
import Footer from '../components/sections/Footer/page';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../components/types';

const pageData = pages.home;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function Home() {
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    Services: <Services data={sections.services} limit={6} />,
    WhyChooseUs: sections.why_choose_us ? <WhyChooseUs data={sections.why_choose_us} /> : null,
    SocBanner: <SocBanner data={sections.soc_banner} />,
    Process: <Process data={sections.process} />,
    Portfolio: <Portfolio data={sections.portfolio} />,
    Contact: <Contact data={sections.contact} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#040812] text-slate-100 font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}