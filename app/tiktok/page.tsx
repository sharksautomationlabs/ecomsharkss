import TikTokHeader from '../components/TikTokHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import TikTokBestServices from '../components/TikTokBestServices';
import Footer from '../components/Footer';

const tiktokImages = [
  {
    id: 1,
    imageUrl: "/images/tiktok-sale1.jpg",
  },
  {
    id: 2,
    imageUrl: "/images/tiktok-sale2.jpg",
  },
  {
    id: 3,
    imageUrl: "/images/tiktok-sale3.jpg",
  }
];


const tiktokTestimonials = [
  {
    name: "Alex Chen",
    subtitle: "TikTok Content Creator",
    review: "ECOM SHARKS TikTok automation services are game-changing! They helped us grow from 1K to 500K followers in just 6 months. Their content strategy and posting automation increased our engagement by 300%. Our brand visibility skyrocketed!",
    rating: 4,
    postDate: "Jan 10, 2025",
    replyDate: "Jan 11, 2025",
    profileImage: "/images/Dummy-profile/Alex-Chen.png"
  },
  {
    name: "Sophie Anderson",
    subtitle: "Social Media Manager",
    review: "The TikTok automation from ECOM SHARKS transformed our social media presence. They automated our content creation, posting schedule, and audience engagement. Our reach increased by 400% and we're now generating consistent leads for our business!",
    rating: 5,
    postDate: "Dec 22, 2024",
    replyDate: "Dec 23, 2024",
    profileImage: "/images/Dummy-profile/Sophie-Anderson.png"
  },
  {
    name: "Ryan Patel",
    subtitle: "Digital Marketing Specialist",
    review: "Working with ECOM SHARKS for TikTok automation has been incredible. They set up advanced targeting, automated our ad campaigns, and optimized our content for maximum viral potential. Our conversion rate improved by 250% and we're dominating our niche!",
    rating: 5,
    postDate: "Nov 15, 2024",
    replyDate: "Nov 16, 2024",
    profileImage: "/images/Dummy-profile/Ryan-Patel.png"
  }
];

export default function TikTokPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <TikTokHeader />
      <Mission 
        useCustomContent={true}
        customTitle="Maximize Your Brand's Impact with Our TikTok Automation Services"
        customDescription="Our TikTok Automation Services are designed to elevate your brand's presence and drive engagement on this rapidly growing platform. We offer a range of services, from account setup and management to content creation and audience targeting, all tailored to meet your specific business goals.

Our team of experts is well-versed with the latest TikTok trends and algorithms, ensuring that your brand stays relevant and visible to your target audience. Whether you're looking to launch a new product, increase brand awareness, or drive sales, we can help you achieve your goals."
        logoType="tiktok"
      />
      <ImageGallery images={tiktokImages} />
      <Testimonials testimonials={tiktokTestimonials} />
      <TikTokBestServices />
      <Footer />
    </div>
  );
}