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
        heroTitle="Our Every Success Has History"
        heroSubtitle="Discover the journey, expertise, and values that drive ECOM SHARKS to deliver exceptional e-commerce solutions"
        topNavText="🌟 The Ultimate Engine for Your Online Sales"
      />
      
      {/* Experts section showcasing the team */}
      <Experts 
        title="Meet the Experts Behind ECOM SHARKS Success"
        subtitle="Our dedicated team stands at the forefront of Amazon's fulfillment programs and beyond. We don't just help businesses grow—we empower them to scale and thrive! With our deep e-Commerce expertise, we position your brand in the consumer spotlight, ensuring lasting success in the competitive marketplace."
      />
      
      {/* Mission section with company values and goals */}
      <Mission 
        useCustomContent={true}
        customTitle="I Believe Success in E-commerce is Not Just About Selling, It's About Creating Value and Lasting Impact"
        customDescription="At Ecomsharkss, we believe that with the right strategy and unwavering dedication, anyone can take their business on significant levels. Our mission is to empower entrepreneurs to achieve success through tailored solutions for Amazon, Walmart, Shopify, & TikTok.

Our expert team ensures your products stand out. We provide comprehensive support and innovative strategies that propel your business forward, ensuring sustained growth and unmatched success."
      />
      <Testimonials />
      {/* Footer section with contact information */}
      <Footer />
    </div>
  );
}
