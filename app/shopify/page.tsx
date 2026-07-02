import ShopifyHeader from '../components/ShopifyHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import ShopifyBestServices from '../components/ShopifyBestServices';
import Footer from '../components/Footer';

const shopifyTestimonials = [
  {
    name: "Lisa Thompson",
    subtitle: "Shopify Store Owner",
    review: "ECOM SHARKS transformed our Shopify store with their automation services. They set up dropshipping automation, optimized our checkout process, and implemented advanced analytics. Our conversion rate increased by 180% and we're now doing $75K monthly revenue!",
    rating: 5,
    postDate: "Jan 5, 2025",
    replyDate: "Jan 6, 2025",
    profileImage: "/images/Dummy-profile/Lisa-Thompson.png"
  },
  {
    name: "James Wilson",
    subtitle: "E-commerce Entrepreneur",
    review: "The Shopify automation services from ECOM SHARKS are outstanding. They automated our inventory management, customer service, and marketing campaigns. We went from manual processes to a fully automated store that runs 24/7. Sales tripled in 4 months!",
    rating: 4,
    postDate: "Dec 18, 2024",
    replyDate: "Dec 19, 2024",
    profileImage: "/images/Dummy-profile/James-Wilson.png"
  },
  {
    name: "Maria Garcia",
    subtitle: "Online Business Owner",
    review: "Working with ECOM SHARKS for our Shopify automation has been incredible. They implemented advanced product sourcing, automated order fulfillment, and set up dynamic pricing. Our profit margins improved by 150% and we're scaling faster than ever before!",
    rating: 5,
    postDate: "Nov 30, 2024",
    replyDate: "Dec 1, 2024",
    profileImage: "/images/Dummy-profile/Maria-Garcia.png"
  }
];

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
      <Testimonials testimonials={shopifyTestimonials} />
      <ShopifyBestServices />
      <Footer />
    </div>
  );
}