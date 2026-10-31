import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  drag_hint?: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
}

export interface FooterData {
  cta_title_regular?: string;
  cta_title_highlight?: string;
  cta_description?: string;
  email?: string;
  phone?: string;
  follow_us_text?: string;
  socials?: FooterSocialItem[];
  button_text?: string;
  button_link?: string;
  logo: string;
  logo_text: string;
  logo_subtext: string;
  copyright: string;
  links: LinkType[];
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroFeatureCard {
  id: string;
  icon: string;
  title: string;
}

export interface HeroFloatingBadge {
  id: string;
  icon: string;
  title: string;
}

export interface HeroStatItem {
  value: string;
  label: string;
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  title_highlight: string;
  title_line3?: string;
  description: string;
  cta_text: string;
  cta_link: string;
  video_cta_text?: string;
  video_cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  features?: HeroFeatureCard[];
  stats?: HeroStatItem[];
  floating_badges?: HeroFloatingBadge[];
  video?: string;
  image: string;
  image_alt: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  image: string;
  image_alt: string;
  badge: {
    icon: string;
    title: string;
    subtitle: string;
  };
}

export interface SocBannerData {
  image: string;
  image_alt: string;
}

export interface ServiceItem {
  id: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image?: string;
  image_alt?: string;
  link_text: string;
  link_href: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  wave_image: string;
  wave_alt: string;
  badge_text: string;
  items: ServiceItem[];
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  steps: ProcessStep[];
  variant?: 'timeline' | 'cards' | string;
}

export interface WhyChooseUsFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsClientProof {
  avatars: string[];
  count_highlight: string;
  count_subtext: string;
}

export interface WhyChooseUsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image: string;
  image_alt: string;
  features: WhyChooseUsFeature[];
  cta_text: string;
  cta_link: string;
  social_proof?: WhyChooseUsClientProof;
}

export interface ContactCardItem {
  id: string;
  title: string;
  description?: string;
  line1?: string;
  line2?: string;
  action_text: string;
  action_link: string;
  icon: string;
}

export interface ContactFormFieldConfig {
  label?: string;
  placeholder?: string;
  icon?: string;
  options?: string[];
}

export interface ContactFormData {
  eyebrow?: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  fields?: {
    name?: ContactFormFieldConfig | string;
    email?: ContactFormFieldConfig | string;
    phone?: ContactFormFieldConfig | string;
    company?: ContactFormFieldConfig | string;
    service?: ContactFormFieldConfig;
    requirements?: ContactFormFieldConfig | string;
    country?: ContactFormFieldConfig;
    industry?: ContactFormFieldConfig;
    budget?: ContactFormFieldConfig;
    name_placeholder?: string;
    email_placeholder?: string;
    phone_placeholder?: string;
    subject_placeholder?: string;
    message_placeholder?: string;
  };
  button_text: string;
  security_note?: string;
  success_title?: string;
  success_message?: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  email?: string;
  phone?: string;
  address?: string;
  channels_eyebrow?: string;
  channels_title_regular?: string;
  channels_title_highlight?: string;
  channels_description?: string;
  cards?: ContactCardItem[];
  form?: ContactFormData;
  map?: {
    image?: string;
    embed_url?: string;
    office_title?: string;
    office_address_line1?: string;
    office_address_line2?: string;
  };
}

export interface PortfolioItem {
  id: string;
  slug?: string;
  category: string;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  link_text: string;
  link_href: string;
  result?: string;
}

export interface PortfolioSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description?: string;
  items: PortfolioItem[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  watermark?: string;
  components: PageComponent[];
}

export interface SitePages {
  home: PageMeta;
}

export interface SiteSections {
  hero: HeroSectionData;
  about: AboutSectionData;
  soc_banner: SocBannerData;
  services: ServicesSectionData;
  why_choose_us?: WhyChooseUsSectionData;
  process: ProcessSectionData;
  portfolio: PortfolioSectionData;
  contact: ContactSectionData;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    CyberSecurity: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const template = siteJson.categories.CyberSecurity.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
