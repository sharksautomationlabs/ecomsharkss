import ShopifyHeader from '../components/ShopifyHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import ShopifyBestServices from '../components/ShopifyBestServices';
import Footer from '../components/Footer';

export default function ShopifyPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <ShopifyHeader />
      <Mission 
        useCustomContent={true}
        customTitle="Achieve Unparalleled Success in the E-commerce World with Our Shopify Automation Services"
        customDescription="At ECOM SHARKS, we specialize in empowering entrepreneurs and mid-sized businesses through our cutting-edge Shopify automation services. We identify profitable products, boost sales, and provide custom branding solutions, ensuring your Shopify store operates flawlessly and stands out in the competitive e-commerce world.

Expand your product range without the headaches of inventory maintenance and shipping logistics. Our solutions allow you to innovate, explore new markets, and enhance the customer experience, all while maximizing your earnings."
        logoType="shopify"
      />
      <ImageGallery />
      <Testimonials />
      <ShopifyBestServices />
      <Footer />
    </div>
  );
}