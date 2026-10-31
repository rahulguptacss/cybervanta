'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  LayoutGrid,
  CircleDollarSign,
  ChevronDown,
  Check,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { ContactSectionData, ContactCardItem } from '../../types';

interface ContactProps {
  data: ContactSectionData;
}

interface CustomDropdownProps {
  name: string;
  value: string;
  placeholder: string;
  options?: string[];
  icon: React.ReactNode;
  direction?: 'up' | 'down';
  onChange: (name: string, value: string) => void;
}

function CustomDropdown({
  name,
  value,
  placeholder,
  options = [],
  icon,
  direction = 'down',
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(name, option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex w-full items-center justify-between rounded-xl border bg-[#020713]/90 px-3.5 py-3 text-sm text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.35)]'
            : 'border-[#00f0ff]/25 hover:border-[#00f0ff]/50'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
          <span className="shrink-0">{icon}</span>
          <span
            className={`truncate text-sm ${
              value ? 'text-white font-medium' : 'text-[#94a3b8]'
            }`}
          >
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`h-4.5 w-4.5 text-[#00f0ff] shrink-0 transition-transform duration-250 ease-out ${
            isOpen ? (direction === 'up' ? '-rotate-180' : 'rotate-180') : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Cyber Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 max-h-56 overflow-y-auto rounded-xl border border-[#00f0ff]/40 bg-[#050e1e]/98 p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(0,240,255,0.25)] backdrop-blur-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#00f0ff]/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent ${
            direction === 'up' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
        >
          {options.length > 0 ? (
            options.map((opt) => {
              const isSelected = value === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-xs sm:text-[13.5px] transition-all duration-150 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] font-semibold'
                      : 'text-slate-300 hover:bg-[#00f0ff]/15 hover:text-[#00f0ff] hover:pl-4.5'
                  }`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {isSelected && <Check className="h-4 w-4 text-[#00f0ff] shrink-0" />}
                </button>
              );
            })
          ) : (
            <div className="px-3.5 py-2.5 text-xs text-slate-400">No options available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    requirements: '',
    country: '',
    industry: '',
    budget: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter'].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        requirements: '',
        country: '',
        industry: '',
        budget: '',
      });
    }, 4000);
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'map':
      case 'mappin':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z"
              fill="#00f0ff"
            />
            <circle cx="12" cy="9" r="2.5" fill="#020712" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="#00f0ff">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" fill="#00f0ff" />
            <path
              d="M3 6L12 12.5L21 6"
              stroke="#020712"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'messagesquare':
      case 'chat':
      default:
        return (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 11.5C20 15.642 16.418 19 12 19C10.68 19 9.43 18.705 8.33 18.18L4 19.5L5.42 16.27C4.53 14.93 4 13.29 4 11.5C4 7.358 7.582 4 12 4C16.418 4 20 7.358 20 11.5Z"
              fill="#00f0ff"
            />
            <circle cx="8.5" cy="11.5" r="1.1" fill="#020712" />
            <circle cx="12" cy="11.5" r="1.1" fill="#020712" />
            <circle cx="15.5" cy="11.5" r="1.1" fill="#020712" />
          </svg>
        );
    }
  };

  // Helper resolvers for fields from data.json
  const fields = data.form?.fields as any;
  const getNamePlaceholder = () =>
    (typeof fields?.name === 'object' ? fields?.name?.placeholder : fields?.name) ||
    fields?.name_placeholder ||
    'Your Name / Organization';
  const getEmailPlaceholder = () =>
    (typeof fields?.email === 'object' ? fields?.email?.placeholder : fields?.email) ||
    fields?.email_placeholder ||
    'work.email@company.com';
  const getPhonePlaceholder = () =>
    (typeof fields?.phone === 'object' ? fields?.phone?.placeholder : fields?.phone) ||
    fields?.phone_placeholder ||
    '+1 (800) 000-0000';
  const getCompanyPlaceholder = () =>
    (typeof fields?.company === 'object' ? fields?.company?.placeholder : fields?.company) ||
    'Company Name / Entity';
  const getServicePlaceholder = () =>
    fields?.service?.placeholder ||
    fields?.subject_placeholder ||
    'Select Defense Scope (SOC, Zero-Trust, Cloud Audit)';
  const getServiceOptions = () =>
    fields?.service?.options || [
      'Managed Security Services (MSS)',
      'Cloud Security Posture Management',
      '24/7 SOC Monitoring & Threat Detection',
      'Penetration Testing & Red Teaming',
      'Incident Response & Forensics',
      'Compliance & Regulatory Audit (ISO/SOC2/NIST)',
      'Zero Trust Architecture Implementation',
      'Quantum-Safe Hybrid Cryptography',
    ];
  const getRequirementsPlaceholder = () =>
    (typeof fields?.requirements === 'object'
      ? fields?.requirements?.placeholder
      : fields?.requirements) ||
    fields?.message_placeholder ||
    'Describe your enterprise infrastructure scale or security challenges...';
  const getCountryPlaceholder = () =>
    fields?.country?.placeholder || 'Select Country';
  const getCountryOptions = () =>
    fields?.country?.options || [
      'United States',
      'United Kingdom',
      'Canada',
      'Germany',
      'India',
      'Australia',
      'United Arab Emirates',
      'Singapore',
      'Other',
    ];
  const getIndustryPlaceholder = () =>
    fields?.industry?.placeholder || 'Select Industry Type';
  const getIndustryOptions = () =>
    fields?.industry?.options || [
      'Financial Services & Banking',
      'Healthcare & Life Sciences',
      'Technology & SaaS',
      'E-Commerce & Retail',
      'Manufacturing & Logistics',
      'Government & Public Sector',
      'Legal & Professional Services',
      'Energy & Critical Infrastructure',
      'Other',
    ];
  const getBudgetPlaceholder = () =>
    fields?.budget?.placeholder || 'Select Budget Range';
  const getBudgetOptions = () =>
    fields?.budget?.options || [
      'Under $10,000',
      '$10,000 - $25,000',
      '$25,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000+',
    ];

  return (
    <section
      id="contact"
      className="relative w-full pt-10 sm:pt-14 pb-20 sm:pb-28 lg:pb-32 bg-[#000000] text-white scroll-mt-24"
    >
      {/* Background cyber ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />
        <div className="absolute bottom-1/3 right-0 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow with Cyan flanking lines matching CyberVanta Logo */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 sm:w-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#0052ff] to-[#00e5ff]" />
          <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#ffffff] uppercase drop-shadow-[0_0_10px_rgba(0,140,255,0.4)]">
            {data.eyebrow}
          </span>
          <div className="w-10 sm:w-12 h-[1.5px] bg-gradient-to-l from-transparent via-[#0052ff] to-[#00e5ff]" />
        </div>

        {/* Section Heading matching CyberVanta Logo Gradient */}
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight mb-4 text-center leading-tight">
          <span>{data.title_regular} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] drop-shadow-[0_0_25px_rgba(0,166,255,0.65)]">
            {data.title_highlight}
          </span>
        </h2>

        {/* Section Description matching screenshot */}
        <p className="text-center text-[#cbd5e1] text-sm sm:text-[15px] font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
          {data.description}
        </p>

        {/* Main Showcase 2-Column Container: Get A Quote Form + 4 Direct Contact Cards */}
        <div
          id="contact-form"
          className="relative rounded-3xl border border-[#0099ff]/30 bg-[#030917]/90 shadow-[0_0_40px_rgba(0,140,255,0.15)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Get A Quote Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Form Eyebrow with Cyan Dash */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1.5px] bg-gradient-to-r from-[#0052ff] to-[#00e5ff]" />
                  <span className="text-xs font-bold tracking-widest text-[#00e5ff] uppercase">
                    {data.form?.eyebrow || 'REQUEST A QUOTE'}
                  </span>
                </div>

                {/* Form Title & Subtitle with CyberVanta Logo Gradient */}
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight mb-2">
                  <span>{data.form?.title_regular || 'Request A'} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] drop-shadow-[0_0_20px_rgba(0,140,255,0.5)]">
                    {data.form?.title_highlight || 'Quote'}
                  </span>
                </h3>

                <p className="text-[#cbd5e1] text-xs sm:text-[14px] font-light leading-relaxed mb-6 sm:mb-8">
                  {data.form?.description ||
                    'Please fill out the form below with your requirements. Our defense team will review your information and send you a customized quote.'}
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-cyan-400 bg-cyan-950/30 p-8 text-center my-6">
                    <CheckCircle2 className="h-12 w-12 text-[#00f0ff] mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-white mb-2">
                      {data.form?.success_title || 'Quote Request Received!'}
                    </h4>
                    <p className="text-slate-300 text-sm">
                      {data.form?.success_message ||
                        'Our cybersecurity specialists will review your requirements and reach out within 2 hours.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <User className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={getNamePlaceholder()}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <Mail className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={getEmailPlaceholder()}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <Phone className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          onKeyDown={handlePhoneKeyDown}
                          placeholder={getPhonePlaceholder()}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="relative flex items-center rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                        <Building2 className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={getCompanyPlaceholder()}
                          className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Service Interested In Custom Cyber Dropdown */}
                    <CustomDropdown
                      name="service"
                      value={formData.service}
                      placeholder={getServicePlaceholder()}
                      options={getServiceOptions()}
                      direction="down"
                      icon={<LayoutGrid className="h-4.5 w-4.5 text-[#00f0ff]" />}
                      onChange={handleDropdownChange}
                    />

                    {/* Requirements Textarea */}
                    <div className="relative flex items-start rounded-xl border border-[#00f0ff]/25 bg-[#020713]/90 px-3.5 py-3 text-sm text-white focus-within:border-[#00f0ff] focus-within:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200">
                      <MessageSquare className="h-4.5 w-4.5 text-[#00f0ff] shrink-0 mr-3 mt-1" />
                      <textarea
                        name="requirements"
                        rows={3}
                        required
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder={getRequirementsPlaceholder()}
                        className="w-full bg-transparent text-white placeholder-[#94a3b8] text-sm focus:outline-none resize-none"
                      />
                    </div>

                    {/* Row 3: Country & Industry Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Country Custom Cyber Dropdown */}
                      <CustomDropdown
                        name="country"
                        value={formData.country}
                        placeholder={getCountryPlaceholder()}
                        options={getCountryOptions()}
                        direction="down"
                        icon={<MapPin className="h-4.5 w-4.5 text-[#00f0ff]" />}
                        onChange={handleDropdownChange}
                      />

                      {/* Industry Type Custom Cyber Dropdown (Opens UPWARDS so it never gets clipped) */}
                      <CustomDropdown
                        name="industry"
                        value={formData.industry}
                        placeholder={getIndustryPlaceholder()}
                        options={getIndustryOptions()}
                        direction="up"
                        icon={<Building2 className="h-4.5 w-4.5 text-[#00f0ff]" />}
                        onChange={handleDropdownChange}
                      />
                    </div>

                    {/* Budget Range Custom Cyber Dropdown (Opens UPWARDS) */}
                    <CustomDropdown
                      name="budget"
                      value={formData.budget}
                      placeholder={getBudgetPlaceholder()}
                      options={getBudgetOptions()}
                      direction="up"
                      icon={<CircleDollarSign className="h-4.5 w-4.5 text-[#00f0ff]" />}
                      onChange={handleDropdownChange}
                    />

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] via-[#0099ff] to-[#0052ff] py-3.5 px-8 font-extrabold text-sm sm:text-base text-[#020712] shadow-[0_0_25px_rgba(0,180,255,0.55)] hover:shadow-[0_0_35px_rgba(0,229,255,0.8)] hover:brightness-110 transform-gpu will-change-transform transition-all duration-200 ease-out active:scale-[0.98] group cursor-pointer"
                      >
                        <span>{data.form?.button_text || 'Get A Quote'}</span>
                        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:translate-x-1">
                          <ArrowRight className="h-3.5 w-3.5 text-[#0052ff]" />
                        </span>
                      </button>
                    </div>

                    {/* Security Guarantee Note */}
                    <div className="flex items-center gap-2 pt-1 text-xs text-[#94a3b8]">
                      <Lock className="h-3.5 w-3.5 text-[#00e5ff] shrink-0" />
                      <span>
                        {data.form?.security_note ||
                          'Your information is secure with us.'}
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: 4 Direct Contact Cards in place of Google Map */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#0099ff]/25 bg-[#020713]/80 rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl flex flex-col justify-between">
              <div>
                {/* Right Column Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1.5px] bg-gradient-to-r from-[#0052ff] to-[#00e5ff]" />
                  <span className="text-xs font-bold tracking-widest text-[#00e5ff] uppercase">
                    {data.channels_eyebrow || 'DIRECT DEFENSE CHANNELS'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  <span>{data.channels_title_regular || 'Priority'} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0070f3]">
                    {data.channels_title_highlight || 'Operations'}
                  </span>
                </h3>
                <p className="text-xs sm:text-[13px] text-[#cbd5e1] font-light leading-relaxed mb-6">
                  {data.channels_description ||
                    'Direct encrypted channels to our SOC commanders and security architecture teams.'}
                </p>

                {/* 4 Stacked Contact Cards */}
                <div className="space-y-4">
                  {data.cards && data.cards.map((card: ContactCardItem) => (
                    <div
                      key={card.id}
                      className="rounded-2xl border border-[#0052ff]/30 bg-[#030917]/90 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#00e5ff] hover:bg-[#0052ff]/10 hover:shadow-[0_0_20px_rgba(0,82,255,0.25)] group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    >
                      <div className="flex items-start gap-3.5 mb-2.5">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#0099ff]/60 bg-gradient-to-br from-[#0052ff]/25 to-[#00e5ff]/15 flex items-center justify-center shrink-0 shadow-[0_0_14px_rgba(0,140,255,0.35)] transition-transform duration-300 group-hover:scale-105">
                          {getCardIcon(card.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-[15px] font-bold text-white tracking-tight leading-snug mb-1">
                            {card.title}
                          </h4>
                          {card.description ? (
                            <p className="text-xs sm:text-[12.5px] text-[#cbd5e1] font-light leading-relaxed">
                              {card.description}
                            </p>
                          ) : (
                            <div className="text-xs sm:text-[12.5px] text-[#cbd5e1] font-light leading-relaxed">
                              <p>{card.line1}</p>
                              <p>{card.line2}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#0052ff]/20 flex items-center justify-between">
                        <Link
                          href={card.action_link}
                          target={card.action_link.startsWith('http') ? '_blank' : undefined}
                          rel={card.action_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00e5ff] hover:text-white transition-colors duration-200 group/link"
                        >
                          <span className="truncate">{card.action_text}</span>
                          <span className="w-4.5 h-4.5 rounded-full border border-[#00e5ff] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/link:border-white group-hover/link:translate-x-0.5">
                            <ArrowRight className="h-2.5 w-2.5 text-[#00e5ff] group-hover/link:text-white" />
                          </span>
                        </Link>
                        <span className="text-[10px] font-mono tracking-widest text-[#00e5ff]/60 uppercase">
                          ACTIVE 24/7
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
