import Header from '../components/Header';
import Experts from '../components/Experts';
import Mission from '../components/Mission';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

export default function About() {
  return (
    <div className="w-full bg-white">
      {/* Header section with navigation and hero */}
      <Header 
        heroTitle="Proof beats promises—here’s our story"
        heroSubtitle="Meet the people, playbooks, and standards behind Aain Ali’s e-commerce work across Amazon, Walmart, Shopify, and TikTok."
        topNavText="🌟 The growth engine for serious online brands"
      />
      
      {/* Experts section showcasing the team */}
      <Experts 
        title="Operators who run the work—not just advise it"
        subtitle="We’ve shipped catalog fixes, ad structure, and ops systems across major marketplaces. The goal is simple: compounding performance you can see in the numbers."
      />
      
      {/* Mission section with company values and goals */}
      <Mission 
        useCustomContent={true}
        customTitle="Success isn’t more hustle—it’s better systems and clearer priorities"
        customDescription="At Aain Ali, we believe that with the right strategy and unwavering dedication, anyone can take their business on significant levels. Our mission is to empower entrepreneurs to achieve success through tailored solutions for Amazon, Walmart, Shopify, & TikTok.

Our expert team ensures your products stand out. We provide comprehensive support and innovative strategies that propel your business forward, ensuring sustained growth and unmatched success."
      />
      <Testimonials />
      {/* Footer section with contact information */}
      <Footer />
    </div>
  );
}
