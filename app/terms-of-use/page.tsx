'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfUsePage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div variants={textVariants} className="mb-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {title}
      </h2>
      {children}
    </motion.div>
  );

  const Para = ({ children }: { children: React.ReactNode }) => (
    <p className="text-base lg:text-lg text-[#2c2020] leading-relaxed mb-3" style={{ fontFamily: "'Barlow', sans-serif" }}>
      {children}
    </p>
  );

  return (
    <>
      <Head>
        <title>Terms of Use - Aain Ali LLC</title>
        <meta name="description" content="Terms and Conditions for Aain Ali LLC. Read our terms governing use of our website and services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full bg-white min-h-screen">
        <Header
          heroTitle="Terms of Use"
          heroSubtitle="Please read these terms carefully before using our website or services."
        />

        <section ref={ref} className="w-full bg-white py-16 lg:py-24 relative z-10">
          <div className="container mx-auto px-5 lg:px-20">
            <motion.div
              initial="visible"
              animate={controls}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={textVariants} className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 relative z-20 opacity-100">

                {/* Meta info */}
                <motion.div variants={textVariants} className="mb-8 space-y-1">
                  <p className="text-sm text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}><strong>Effective Date:</strong> 1/05/2026</p>
                  <p className="text-sm text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}><strong>Business Name:</strong> Aain Ali LLC</p>
                  <p className="text-sm text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}><strong>Website:</strong> <a href="https://aainali.co" className="text-[#35c4dd] hover:underline">https://aainali.co</a></p>
                  <p className="text-sm text-[#2c2020]" style={{ fontFamily: "'Barlow', sans-serif" }}><strong>Business Address:</strong> 30 N Gould St Ste N, Sheridan, WY 82801, United States</p>
                </motion.div>

                {/* Intro */}
                <motion.div variants={textVariants} className="mb-8">
                  <Para>
                    Welcome to Aain Ali LLC. These Terms and Conditions govern your access to and use of our website, services, communications, forms, consultations, and any related business interactions with Aain Ali LLC.
                  </Para>
                  <Para>
                    By accessing our website, submitting a form, booking a consultation, communicating with us, or using our services, you agree to these Terms and Conditions. If you do not agree with these terms, please do not use our website or services.
                  </Para>
                </motion.div>

                <Section title="1. About Aain Ali LLC">
                  <Para>
                    Aain Ali LLC provides e-commerce growth, marketplace management, advertising, catalog optimization, operational support, and consulting services for online businesses. Our services may include support related to Amazon, Shopify, TikTok, Walmart, product listings, campaign management, reporting, account operations, automation, and related business growth activities.
                  </Para>
                </Section>

                <Section title="2. Use of Our Website">
                  <Para>
                    You agree to use our website only for lawful purposes. You may not use the website in any way that could damage, disable, overload, or interfere with the website, its security, or its normal operation.
                  </Para>
                  <Para>
                    You agree not to submit false, misleading, fraudulent, or unauthorized information through our forms, live chat, booking tools, or communication channels.
                  </Para>
                </Section>

                <Section title="3. Quotes, Consultations, and Services">
                  <Para>
                    Any quote, proposal, consultation, or service description provided by Aain Ali LLC is based on the information available at the time. Final pricing, timelines, deliverables, and scope of work may vary depending on the client's business needs, platform requirements, account condition, advertising budget, product volume, and other operational factors.
                  </Para>
                  <Para>
                    No service is considered active until both parties have agreed to the scope, pricing, and payment terms.
                  </Para>
                </Section>

                <Section title="4. No Guaranteed Results">
                  <Para>
                    Aain Ali LLC works to improve e-commerce operations, marketplace performance, listing quality, advertising structure, and growth systems. However, results may vary based on many factors, including market demand, competition, platform policies, advertising budgets, product quality, pricing, inventory, reviews, customer service, and other business conditions.
                  </Para>
                  <Para>
                    Unless specifically stated in a signed written agreement, Aain Ali LLC does not guarantee any specific sales volume, revenue increase, profit level, ranking position, advertising return, account approval, or platform outcome.
                  </Para>
                </Section>

                <Section title="5. Client Responsibilities">
                  <Para>
                    Clients are responsible for providing accurate information, timely access, required approvals, platform credentials, product details, brand assets, billing information, and any other materials needed to perform the services.
                  </Para>
                  <Para>
                    Clients are also responsible for complying with all applicable marketplace rules, advertising policies, tax obligations, product regulations, intellectual property requirements, and business laws related to their products and services.
                  </Para>
                </Section>

                <Section title="6. Payments and Billing">
                  <Para>
                    Payment terms will be provided in the applicable quote, invoice, proposal, or service agreement. By approving a service or making a payment, you agree to the pricing and payment terms provided at that time.
                  </Para>
                  <Para>
                    Late payments, missed payments, chargebacks, or failure to provide required billing information may result in delayed work, paused services, or termination of services.
                  </Para>
                </Section>

                <Section title="7. Cancellations and Refunds">
                  <Para>
                    Cancellation and refund terms may vary depending on the service agreement, project type, and work already performed. Setup fees, consulting fees, completed work, third-party costs, advertising costs, software fees, and platform-related expenses may be non-refundable.
                  </Para>
                  <Para>
                    Any refund request will be reviewed based on the applicable agreement and the status of the work completed.
                  </Para>
                </Section>

                <Section title="8. Third-Party Platforms and Tools">
                  <Para>
                    Aain Ali LLC may work with third-party platforms such as Amazon, Shopify, TikTok, Walmart, Google, Meta, analytics tools, advertising platforms, automation tools, live chat tools, calendar tools, and other service providers.
                  </Para>
                  <Para>
                    We are not responsible for outages, policy changes, account restrictions, suspensions, errors, delays, fees, or decisions made by third-party platforms. Clients are responsible for maintaining their own accounts and complying with each platform's terms and policies.
                  </Para>
                </Section>

                <Section title="9. Intellectual Property">
                  <Para>
                    All content on this website, including text, graphics, logos, designs, service descriptions, layouts, images, and other materials, is owned by or licensed to Aain Ali LLC unless otherwise stated.
                  </Para>
                  <Para>
                    You may not copy, reproduce, distribute, modify, or use our website content, branding, or materials without written permission.
                  </Para>
                  <Para>
                    Client-owned materials, such as product images, brand assets, trademarks, account data, and business information, remain the property of the client.
                  </Para>
                </Section>

                <Section title="10. Confidentiality">
                  <Para>
                    Aain Ali LLC may receive confidential business information from clients, including account data, sales data, product details, login access, strategy documents, advertising performance, and operational information.
                  </Para>
                  <Para>
                    We will use reasonable efforts to protect confidential client information and will only use it for the purpose of providing requested services, unless disclosure is required by law or authorized by the client.
                  </Para>
                </Section>

                <Section title="11. SMS Terms and Conditions">
                  <Para>
                    By providing your mobile phone number and opting in through our website forms, quote request forms, live chat, booking tools, or other communication channels, you agree to receive SMS messages from Aain Ali LLC.
                  </Para>
                  <Para>
                    SMS messages may include appointment confirmations, quote follow-ups, consultation reminders, service updates, onboarding information, support responses, and account-related communications.
                  </Para>
                  <Para>
                    Message frequency may vary depending on your request, consultation, project status, or service relationship. Message and data rates may apply depending on your mobile carrier and plan.
                  </Para>
                  <Para>
                    You can opt out of SMS messages at any time by replying <strong>STOP</strong>. After replying STOP, you may receive a final confirmation message confirming that you have been unsubscribed. You can reply <strong>HELP</strong> for assistance.
                  </Para>
                  <Para>
                    Consent to receive SMS messages is not a condition of purchase. Aain Ali LLC does not sell, rent, or share SMS opt-in consent with third parties for their marketing purposes.
                  </Para>
                </Section>

                <Section title="12. Email and Other Communications">
                  <Para>
                    By submitting your contact information, you authorize Aain Ali LLC to contact you by email, phone, SMS, live chat, or other communication methods regarding your inquiry, consultation, quote, project, or services.
                  </Para>
                  <Para>
                    You may request to stop receiving non-essential communications by contacting us directly.
                  </Para>
                </Section>

                <Section title="13. Limitation of Liability">
                  <Para>
                    To the maximum extent permitted by law, Aain Ali LLC shall not be liable for indirect, incidental, consequential, special, punitive, or lost-profit damages arising from your use of our website, services, third-party platforms, marketplace accounts, advertising campaigns, or business decisions.
                  </Para>
                  <Para>
                    Our total liability for any claim related to services shall not exceed the amount paid by the client for the specific service giving rise to the claim, unless otherwise required by law.
                  </Para>
                </Section>

                <Section title="14. Indemnification">
                  <Para>
                    You agree to indemnify and hold harmless Aain Ali LLC, its owners, team members, contractors, and partners from any claims, damages, losses, liabilities, costs, or expenses arising from your use of our services, your violation of these terms, your breach of any platform policy, your products or services, or your violation of applicable laws.
                  </Para>
                </Section>

                <Section title="15. Changes to These Terms">
                  <Para>
                    Aain Ali LLC may update these Terms and Conditions at any time. Updates will be posted on this page with a revised effective date. Continued use of our website or services after changes are posted means you accept the updated terms.
                  </Para>
                </Section>

                <Section title="16. Governing Law">
                  <Para>
                    These Terms and Conditions are governed by the laws of the State of Wyoming, United States, without regard to conflict of law principles.
                  </Para>
                </Section>

                <Section title="17. Contact Information">
                  <Para>For questions about these Terms and Conditions, please contact us:</Para>
                  <div className="bg-[#f8fafc] rounded-lg p-6 space-y-1" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    <p className="text-base text-[#2c2020] font-bold">Aain Ali LLC</p>
                    <p className="text-base text-[#2c2020]">30 N Gould St Ste N</p>
                    <p className="text-base text-[#2c2020]">Sheridan, WY 82801</p>
                    <p className="text-base text-[#2c2020]">United States</p>
                    <p className="text-base text-[#2c2020] mt-3"><strong>Email:</strong> <a href="mailto:aainalillc@gmail.com" className="text-[#35c4dd] hover:underline">aainalillc@gmail.com</a></p>
                    <p className="text-base text-[#2c2020]"><strong>Phone:</strong> <a href="tel:+17738287104" className="text-[#35c4dd] hover:underline">+1 (773) 828-7104</a></p>
                    <p className="text-base text-[#2c2020]"><strong>Website:</strong> <a href="https://aainali.co" className="text-[#35c4dd] hover:underline">https://aainali.co</a></p>
                  </div>
                </Section>

              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
