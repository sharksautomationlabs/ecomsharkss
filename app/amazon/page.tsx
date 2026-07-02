import AmazonHeader from '../components/AmazonHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import BestServices from '../components/BestServices';
import Footer from '../components/Footer';

const amazonImages = [
  {
    id: 1,
    imageUrl: "/images/amazon-sale1.jpg",
  },
  {
    id: 2,
    imageUrl: "/images/amazon-sale2.png"
  },
  {
    id: 3,
    imageUrl: "/images/amazon-sale3.png"
  }
];

const amazonTestimonials = [
  {
    name: "David Martinez",
    subtitle: "Amazon FBA Seller",
    review: "ECOM SHARKS helped us launch our first Amazon FBA product and we hit $50K in sales within 3 months! Their automation services for inventory management and PPC optimization are incredible. We went from struggling to profitable in record time.",
    rating: 5,
    postDate: "Jan 12, 2025",
    replyDate: "Jan 13, 2025",
    profileImage: "/images/Dummy-profile/David-Martinez.png"
  },
  {
    name: "Jennifer Walsh",
    subtitle: "E-commerce Business Owner",
    review: "The Amazon FBA automation services from ECOM SHARKS are phenomenal. They handled everything from product research to listing optimization. Our sales increased by 400% and we're now ranking on page 1 for our main keywords. Highly recommend!",
    rating: 5,
    postDate: "Dec 8, 2024",
    replyDate: "Dec 9, 2024",
    profileImage: "/images/Dummy-profile/Jennifer-Walsh.png"
  },
  {
    name: "Robert Kim",
    subtitle: "Amazon Seller",
    review: "Working with ECOM SHARKS for our Amazon FBA business has been transformative. Their automation tools for inventory forecasting and repricing saved us from stockouts and helped us maintain competitive pricing. Revenue grew 250% in 6 months!",
    rating: 4,
    postDate: "Nov 20, 2024",
    replyDate: "Nov 21, 2024",
    profileImage: "/images/Dummy-profile/Robert-Kim.png"
  }
];

export default function AmazonPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AmazonHeader />
      <Mission 
        useCustomContent={true}
        customTitle="Revolutionize Your E-commerce Business with Premium Amazon FBA Automation Services"
        customDescription="Our team of seasoned professionals is dedicated to optimizing your Amazon store, streamlining operations, and driving substantial revenue growth. We combine advanced automation technologies to ensure your business scales effortlessly, allowing you to focus on strategic growth while we handle the complexities.

Our services are designed to provide seamless integration, from inventory management to order fulfillment, ensuring a hassle-free experience. With our commitment to excellence and tailored solutions, we deliver exceptional results and setting your business on a trajectory for sustained success."
        logoType="walmart"
      />
      <ImageGallery images={amazonImages} />
      <Testimonials testimonials={amazonTestimonials} />
      <BestServices />
      <Footer />
    </div>
  );
}
