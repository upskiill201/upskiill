'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const tocLinks = [
    { label: "1. Introduction", href: "#introduction" },
    { label: "2. Definitions", href: "#definitions" },
    { label: "3. Information Collection", href: "#collection" },
    { label: "4. Types of Data", href: "#data-types" },
    { label: "5. Use of Data", href: "#use-of-data" },
    { label: "6. Retention of Data", href: "#retention" },
    { label: "7. Transfer of Data", href: "#transfer" },
    { label: "8. Disclosure of Data", href: "#disclosure" },
    { label: "9. Security of Data", href: "#security" },
    { label: "10. GDPR Rights", href: "#gdpr" },
    { label: "11. CalOPPA Rights", href: "#caloppa" },
    { label: "12. CCPA Rights", href: "#ccpa" },
    { label: "13. Service Providers", href: "#service-providers" },
    { label: "14. Analytics", href: "#analytics" },
    { label: "22. Contact Us", href: "#contact-us" },
  ];

  const sidebarSections = [
    {
      title: "User Agreements",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "User Content Agreement", href: "#" },
      ]
    },
    {
      title: "Privacy and Data Protection",
      links: [
        { label: "Privacy Policy", href: "/privacy", active: true },
        { label: "Cookies Policy", href: "#" },
        { label: "Data Protection Policy", href: "#" },
      ]
    },
    {
      title: "Financial Policies",
      links: [
        { label: "Refund Policy", href: "#" },
      ]
    },
    {
      title: "Intellectual Property",
      links: [
        { label: "Intellectual Property Rights", href: "#" },
      ]
    },
    {
      title: "Dispute Management",
      links: [
        { label: "Dispute Resolution", href: "#" },
      ]
    },
    {
      title: "Accessibility",
      links: [
        { label: "Accessibility Statement", href: "#" },
        { label: "Third-Party Links", href: "#" },
      ]
    }
  ];

  const clickableLink = (href: string, text: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:underline transition-all">
      {text}
    </a>
  );

  const clickableEmail = (email: string) => (
    <a href={`mailto:${email}`} className="text-black font-semibold hover:underline transition-all">
      {email}
    </a>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar - Hidden on Mobile */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <nav className="sticky top-32 space-y-8">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider px-3">
                  On this page
                </h3>
                <ul className="space-y-1">
                  {tocLinks.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-black hover:bg-gray-50 rounded-md transition-all font-medium"
                      >
                        <i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-8 space-y-8">
                {sidebarSections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider px-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-1">
                      {section.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link 
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                              link.active 
                                ? 'bg-gray-100 text-black font-semibold' 
                                : 'text-gray-500 hover:text-black hover:bg-gray-50'
                            }`}
                          >
                            <i className="fa-regular fa-file-lines text-base opacity-70"></i>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
              <span className="hover:text-gray-600 transition-colors cursor-pointer">Legal Notes</span>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
              <span className="text-gray-900">Privacy Policy</span>
            </nav>

            {/* Content Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 tracking-tight font-jakarta">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                At Teyro (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines our practices regarding the collection, use, disclosure, and protection of your data when you visit our website {clickableLink("https://teyro.app", "teyro.app")}. By using our services, you agree to the terms of this policy.
              </p>
              <p className="text-sm text-gray-400">Effective date: 2026-04-18</p>
            </header>

            <div className="prose prose-slate max-w-none prose-headings:font-jakarta prose-headings:text-black prose-p:text-gray-600 prose-li:text-gray-600">
              
              <section id="introduction" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
                <div className="space-y-4">
                  <p>Welcome to <strong>Teyro</strong>.</p>
                  <p><strong>Teyro</strong> (“us”, “we”, or “our”) operates {clickableLink("https://teyro.app/", "https://teyro.app/")} (hereinafter referred to as <strong>“Service”</strong>).</p>
                  <p>Our Privacy Policy governs your visit to {clickableLink("https://teyro.app/", "https://teyro.app/")}, and explains how we collect, safeguard and disclose information that results from your use of our Service.</p>
                  <p>We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy.</p>
                </div>
              </section>

              <section id="definitions" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">2. Definitions</h2>
                <ul className="space-y-4 list-none pl-0">
                  <li><strong className="block text-black text-lg">SERVICE</strong> means the {clickableLink("https://teyro.app/", "https://teyro.app/") } website operated by Teyro.</li>
                  <li><strong className="block text-black text-lg">PERSONAL DATA</strong> means data about a living individual who can be identified from those data.</li>
                  <li><strong className="block text-black text-lg">USAGE DATA</strong> is data collected automatically either generated by the use of Service or from Service infrastructure itself.</li>
                  <li><strong className="block text-black text-lg">COOKIES</strong> are small files stored on your device.</li>
                  <li><strong className="block text-black text-lg">DATA CONTROLLER</strong> means a natural or legal person who determines the purposes for which and the manner in which any personal data are processed.</li>
                </ul>
              </section>

              <section id="collection" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">3. Information Collection and Use</h2>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              </section>

              <section id="data-types" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">4. Types of Data Collected</h2>
                <h3 className="text-2xl font-bold mt-10 mb-4">4.1 Personal Data</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, Country, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
                <h3 className="text-2xl font-bold mt-12 mb-4">4.5 Other Data</h3>
                <p>While using our Service, we may also collect: sex, age, passport details, {clickableLink("https://policymaker.io/non-disclosure-agreement/", "NDA agreements")}, and other data.</p>
              </section>

              <section id="gdpr" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">10. Your Data Protection Rights Under GDPR</h2>
                <p className="mb-4">If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR.</p>
                <p className="mb-4">If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at {clickableEmail("teyro@gmail.com")}.</p>
              </section>

              <section id="caloppa" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">11. Your Data Protection Rights under CalOPPA</h2>
                <p className="mb-4">According to CalOPPA we agree that users are able to change their personal information by emailing us at {clickableEmail("teyro@gmail.com")}.</p>
              </section>

              <section id="ccpa" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">12. Your Data Protection Rights under CCPA</h2>
                <p className="mb-4">To exercise your California data protection rights described above, please send your request(s) by email: {clickableEmail("teyro@gmail.com")}.</p>
              </section>

              <section id="contact-us" className="mb-16 scroll-mt-32">
                <h2 className="text-3xl font-bold mb-6">22. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us by email: {clickableEmail("teyro@gmail.com")}.</p>
              </section>

            </div>

            {/* Contact Support Section */}
            <section className="mt-20 text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 px-6">
              <h2 className="text-2xl font-bold mb-4 text-black font-jakarta">
                Have questions about our Privacy Policy?
              </h2>
              <p className="mb-8 text-gray-700 max-w-md mx-auto">
                Our team is here to help you understand how we protect your data. We typically respond within 24 hours.
              </p>
              <a 
                href="mailto:teyro@gmail.com" 
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <i className="fa-regular fa-envelope text-lg"></i>
                <span className="text-white">Contact Support</span>
              </a>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
