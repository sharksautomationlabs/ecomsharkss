import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="w-full bg-[#03101e]">
      <Header
        heroTitle="Get In Touch With Our Expert Team"
        heroSubtitle="Ready to transform your e-commerce business? Contact ECOM SHARKS today for personalized solutions and expert guidance."
        topNavText="🌟 Effortless Ecommerce: All Your Accounts, One Powerful Dashboard"
      />
      <div className="relative z-[2]">
        <Footer />
      </div>
    </div>
  );
}
