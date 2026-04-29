import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Teyro',
  description: 'Privacy Policy for the Teyro AI-powered learning platform.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[var(--bg-page)] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">Effective date: 2026-04-18</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24 bg-[var(--bg-card)] p-6 rounded-xl shadow-sm border border-[var(--border)] max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 font-jakarta">Table of Contents</h3>
              <nav>
                <ul className="space-y-3">
                  <li><a href="#introduction" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">1. Introduction</a></li>
                  <li><a href="#definitions" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">2. Definitions</a></li>
                  <li><a href="#information-collection" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">3. Information Collection and Use</a></li>
                  <li><a href="#types-of-data" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">4. Types of Data Collected</a></li>
                  <li><a href="#use-of-data" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">5. Use of Data</a></li>
                  <li><a href="#retention-of-data" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">6. Retention of Data</a></li>
                  <li><a href="#transfer-of-data" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">7. Transfer of Data</a></li>
                  <li><a href="#disclosure-of-data" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">8. Disclosure of Data</a></li>
                  <li><a href="#security-of-data" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">9. Security of Data</a></li>
                  <li><a href="#gdpr" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">10. Your Data Protection Rights (GDPR)</a></li>
                  <li><a href="#caloppa" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">11. Your Data Protection Rights (CalOPPA)</a></li>
                  <li><a href="#ccpa" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">12. Your Data Protection Rights (CCPA)</a></li>
                  <li><a href="#service-providers" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">13. Service Providers</a></li>
                  <li><a href="#analytics" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">14. Analytics</a></li>
                  <li><a href="#cicd-tools" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">15. CI/CD tools</a></li>
                  <li><a href="#advertising" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">16. Advertising</a></li>
                  <li><a href="#behavioral-remarketing" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">17. Behavioral Remarketing</a></li>
                  <li><a href="#payments" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">18. Payments</a></li>
                  <li><a href="#links-to-other-sites" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">19. Links to Other Sites</a></li>
                  <li><a href="#childrens-privacy" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">20. Children’s Privacy</a></li>
                  <li><a href="#changes-to-policy" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">21. Changes to This Privacy Policy</a></li>
                  <li><a href="#contact-us" className="text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors block text-sm font-medium">22. Contact Us</a></li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 bg-[var(--bg-card)] p-8 md:p-12 rounded-xl shadow-sm border border-[var(--border)]">
            <div className="prose prose-blue max-w-none prose-headings:font-jakarta prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)]">
              
              <section id="introduction" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">1. Introduction</h2>
                <p>Welcome to <b>Teyro</b>.</p>
                <p><b>Teyro</b> (“us”, “we”, or “our”) operates <b>https://teyro.app/</b> (hereinafter referred to as <b>“Service”</b>).</p>
                <p>Our Privacy Policy governs your visit to <b>https://teyro.app/</b>, and explains how we collect, safeguard and disclose information that results from your use of our Service.</p>
                <p>We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
                <p>Our Terms and Conditions (<b>“Terms”</b>) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (<b>“agreement”</b>).</p>
              </section>

              <section id="definitions" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">2. Definitions</h2>
                <p><b>SERVICE</b> means the https://teyro.app/ website operated by Teyro.</p>
                <p><b>PERSONAL DATA</b> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p> 
                <p><b>USAGE DATA</b> is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).</p> 
                <p><b>COOKIES</b> are small files stored on your device (computer or mobile device).</p> 
                <p><b>DATA CONTROLLER</b> means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</p> 
                <p><b>DATA PROCESSORS (OR SERVICE PROVIDERS)</b> means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</p> 
                <p><b>DATA SUBJECT</b> is any living individual who is the subject of Personal Data.</p> 
                <p><b>THE USER</b> is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</p>
              </section>

              <section id="information-collection" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">3. Information Collection and Use</h2>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              </section>

              <section id="types-of-data" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">4. Types of Data Collected</h2>
                
                <h3 className="text-xl font-bold mt-6 mb-2">Personal Data</h3>
                <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (<b>“Personal Data”</b>). Personally identifiable information may include, but is not limited to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>0.1. Email address</li>
                  <li>0.2. First name and last name</li>
                  <li>0.3. Phone number</li>
                  <li>0.4. Address, Country, State, Province, ZIP/Postal code, City</li>
                  <li>0.5. Cookies and Usage Data</li>
                </ul>
                <p>We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link.</p>

                <h3 className="text-xl font-bold mt-6 mb-2">Usage Data</h3>
                <p>We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device (<b>“Usage Data”</b>).</p>
                <p>This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                <p>When you access Service with a device, this Usage Data may include information such as the type of device you use, your device unique ID, the IP address of your device, your device operating system, the type of Internet browser you use, unique device identifiers and other diagnostic data.</p>

                <h3 className="text-xl font-bold mt-6 mb-2">Location Data</h3>
                <p>We may use and store information about your location if you give us permission to do so (<b>“Location Data”</b>). We use this data to provide features of our Service, to improve and customize our Service.</p>
                <p>You can enable or disable location services when you use our Service at any time by way of your device settings.</p>

                <h3 className="text-xl font-bold mt-6 mb-2">Tracking Cookies Data</h3>
                <p>We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p>
                <p>Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.</p>
                <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                <p>Examples of Cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>0.1. <b>Session Cookies:</b> We use Session Cookies to operate our Service.</li>
                  <li>0.2. <b>Preference Cookies:</b> We use Preference Cookies to remember your preferences and various settings.</li>
                  <li>0.3. <b>Security Cookies:</b> We use Security Cookies for security purposes.</li>
                  <li>0.4. <b>Advertising Cookies:</b> Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-2">Other Data</h3>
                <p>While using our Service, we may also collect the following information: sex, age, date of birth, place of birth, passport details, citizenship, registration at place of residence and actual address, telephone number (work, mobile), details of documents on education, qualification, professional training, employment agreements, <a href="https://policymaker.io/non-disclosure-agreement/" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">NDA agreements</a>, information on bonuses and compensation, information on marital status, family members, social security (or other taxpayer identification) number, office location and other data.</p>
              </section>

              <section id="use-of-data" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">5. Use of Data</h2>
                <p>Teyro uses the collected data for various purposes:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>0.1. to provide and maintain our Service;</li>
                  <li>0.2. to notify you about changes to our Service;</li>
                  <li>0.3. to allow you to participate in interactive features of our Service when you choose to do so;</li>
                  <li>0.4. to provide customer support;</li>
                  <li>0.5. to gather analysis or valuable information so that we can improve our Service;</li>
                  <li>0.6. to monitor the usage of our Service;</li>
                  <li>0.7. to detect, prevent and address technical issues;</li>
                  <li>0.8. to fulfil any other purpose for which you provide it;</li>
                  <li>0.9. to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;</li>
                  <li>0.10. to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.;</li>
                  <li>0.11. to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;</li>
                  <li>0.12. in any other way we may describe when you provide the information;</li>
                  <li>0.13. for any other purpose with your consent.</li>
                </ul>
              </section>

              <section id="retention-of-data" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">6. Retention of Data</h2>
                <p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                <p>We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>
              </section>

              <section id="transfer-of-data" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">7. Transfer of Data</h2>
                <p>Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
                <p>If you are located outside Cameroon and choose to provide information to us, please note that we transfer the data, including Personal Data, to Cameroon and process it there.</p>
                <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                <p>Teyro will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
              </section>

              <section id="disclosure-of-data" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">8. Disclosure of Data</h2>
                <p>We may disclose personal information that we collect, or you provide:</p>
                <div className="space-y-4">
                  <div>
                    <p>0.1. <b>Disclosure for Law Enforcement.</b></p>
                    <p>Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>
                  </div>
                  <div>
                    <p>0.2. <b>Business Transaction.</b></p>
                    <p>If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.</p>
                  </div>
                  <div>
                    <p>0.3. <b>Other cases. We may disclose your information also:</b></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>0.3.1. to our subsidiaries and affiliates;</li>
                      <li>0.3.2. to contractors, service providers, and other third parties we use to support our business;</li>
                      <li>0.3.3. to fulfill the purpose for which you provide it;</li>
                      <li>0.3.4. for the purpose of including your company’s logo on our website;</li>
                      <li>0.3.5. for any other purpose disclosed by us when you provide the information;</li>
                      <li>0.3.6. with your consent in any other cases;</li>
                      <li>0.3.7. if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="security-of-data" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">9. Security of Data</h2>
                <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
              </section>

              <section id="gdpr" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">10. Your Data Protection Rights Under General Data Protection Regulation (GDPR)</h2>
                <p>If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR.</p>
                <p>We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
                <p>If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at <b>teyro@gmail.com</b>.</p>
                <p>In certain circumstances, you have the following data protection rights:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>0.1. the right to access, update or to delete the information we have on you;</li>
                  <li>0.2. the right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete;</li>
                  <li>0.3. the right to object. You have the right to object to our processing of your Personal Data;</li>
                  <li>0.4. the right of restriction. You have the right to request that we restrict the processing of your personal information;</li>
                  <li>0.5. the right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format;</li>
                  <li>0.6. the right to withdraw consent. You also have the right to withdraw your consent at any time where we rely on your consent to process your personal information;</li>
                </ul>
                <p>Please note that we may ask you to verify your identity before responding to such requests. Please note, we may not able to provide Service without some necessary data.</p>
                <p>You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</p>
              </section>

              <section id="caloppa" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">11. Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)</h2>
                <p>CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law’s reach stretches well beyond California to require a person or company in the United States (and conceivable the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy.</p>
                <p>According to CalOPPA we agree to the following:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>0.1. users can visit our site anonymously;</li>
                  <li>0.2. our Privacy Policy link includes the word “Privacy”, and can easily be found on the home page of our website;</li>
                  <li>0.3. users will be notified of any privacy policy changes on our Privacy Policy Page;</li>
                  <li>0.4. users are able to change their personal information by emailing us at <b>teyro@gmail.com</b>.</li>
                </ul>
                <p>Our Policy on “Do Not Track” Signals:</p>
                <p>We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.</p>
                <p>You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.</p>
              </section>

              <section id="ccpa" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">12. Your Data Protection Rights under the California Consumer Privacy Act (CCPA)</h2>
                <p>If you are a California resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us:</p>
                
                <div className="space-y-4">
                  <div>
                    <p><b>0.1. What personal information we have about you. If you make this request, we will return to you:</b></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>0.0.1. The categories of personal information we have collected about you.</li>
                      <li>0.0.2. The categories of sources from which we collect your personal information.</li>
                      <li>0.0.3. The business or commercial purpose for collecting or selling your personal information.</li>
                      <li>0.0.4. The categories of third parties with whom we share personal information.</li>
                      <li>0.0.5. The specific pieces of personal information we have collected about you.</li>
                      <li>0.0.6. A list of categories of personal information that we have sold, along with the category of any other company we sold it to. If we have not sold your personal information, we will inform you of that fact.</li>
                      <li>0.0.7. A list of categories of personal information that we have disclosed for a business purpose, along with the category of any other company we shared it with.</li>
                    </ul>
                    <p className="mt-2">Please note, you are entitled to ask us to provide you with this information up to two times in a rolling twelve-month period. When you make this request, the information provided may be limited to the personal information we collected about you in the previous 12 months.</p>
                  </div>

                  <div>
                    <p><b>0.2. To delete your personal information.</b> If you make this request, we will delete the personal information we hold about you as of the date of your request from our records and direct any service providers to do the same. In some cases, deletion may be accomplished through de-identification of the information. If you choose to delete your personal information, you may not be able to use certain functions that require your personal information to operate.</p>
                  </div>

                  <div>
                    <p><b>0.3. To stop selling your personal information.</b> We don’t sell or rent your personal information to any third parties for any purpose. We do not sell your personal information for monetary consideration. However, under some circumstances, a transfer of personal information to a third party, or within our family of companies, without monetary consideration may be considered a “sale” under California law. You are the only owner of your Personal Data and can request disclosure or deletion at any time.</p>
                    <p className="mt-2">If you submit a request to stop selling your personal information, we will stop making such transfers.</p>
                  </div>
                </div>

                <p className="mt-4">Please note, if you ask us to delete or stop selling your data, it may impact your experience with us, and you may not be able to participate in certain programs or membership services which require the usage of your personal information to function. But in no circumstances, we will discriminate against you for exercising your rights.</p>
                <p>To exercise your California data protection rights described above, please send your request(s) by email: <b>teyro@gmail.com</b>.</p>
                <p>Your data protection rights, described above, are covered by the CCPA, short for the California Consumer Privacy Act. To find out more, visit the official California Legislative Information website. The CCPA took effect on 01/01/2020.</p>
              </section>

              <section id="service-providers" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">13. Service Providers</h2>
                <p>We may employ third party companies and individuals to facilitate our Service (<b>“Service Providers”</b>), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.</p>
                <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
              </section>

              <section id="analytics" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">14. Analytics</h2>
                <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
              </section>

              <section id="cicd-tools" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">15. CI/CD tools</h2>
                <p>We may use third-party Service Providers to automate the development process of our Service.</p>
              </section>

              <section id="advertising" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">16. Advertising</h2>
                <p>We may use third-party Service Providers to show advertisements to you to help support and maintain our Service.</p>
              </section>

              <section id="behavioral-remarketing" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">17. Behavioral Remarketing</h2>
                <p>We may use remarketing services to advertise on third party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimise and serve ads based on your past visits to our Service.</p>
              </section>

              <section id="payments" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">18. Payments</h2>
                <p>We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors).</p>
                <p>We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
              </section>

              <section id="links-to-other-sites" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">19. Links to Other Sites</h2>
                <p>Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                <p>For example, the outlined <a href="https://policymaker.io/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">privacy policy</a> has been made using <a href="https://policymaker.io/" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">PolicyMaker.io</a>, a free tool that helps create high-quality legal documents. PolicyMaker’s <a href="https://policymaker.io/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">privacy policy generator</a> is an easy-to-use tool for creating a <a href="https://policymaker.io/blog-privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">privacy policy for blog</a>, website, e-commerce store or mobile app.</p>
              </section>

              <section id="childrens-privacy" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">20. Children’s Privacy</h2>
                <p>Our Services are not intended for use by children under the age of 18 (<b>“Child”</b> or <b>“Children”</b>).</p>
                <p>We do not knowingly collect personally identifiable information from Children under 18. If you become aware that a Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.</p>
              </section>

              <section id="changes-to-policy" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">21. Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update “effective date” at the top of this Privacy Policy.</p>
                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              </section>

              <section id="contact-us" className="scroll-mt-28 mb-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-[var(--border)] pb-2">22. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us by email: <b>teyro@gmail.com</b>.</p>
                
                <p className="mt-16 text-xs text-[var(--text-muted)]">This <a href="https://policymaker.io/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">Privacy Policy</a> was created for <b>https://teyro.app/</b> by <a href="https://policymaker.io" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] hover:underline">PolicyMaker.io</a> on 2026-04-18.</p>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
