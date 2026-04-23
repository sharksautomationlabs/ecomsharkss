import WalmartHeader from '../components/WalmartHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import WalmartBestServices from '../components/WalmartBestServices';
import Footer from '../components/Footer';

const walmartImages = [
  {
    id: 1,
    imageUrl: "/images/walmart-sale1.jpg",
  },
  {
    id: 2,
    imageUrl: "/images/walmart-sale2.jpg",
  },
  {
    id: 3,
    imageUrl: "/images/walmart-sale3.jpg",
  }
];

const walmartTestimonials = [
  {
    name: "Thomas Brown",
    subtitle: "Walmart Marketplace Seller",
    review: "Aain ali Walmart automation services are exceptional! They helped us get approved for Walmart Marketplace and set up WFS (Walmart Fulfillment Services). Our sales went from $0 to $100K in 8 months. Their expertise in Walmart's requirements is unmatched!",
    rating: 4.0,
    postDate: "Jan 7, 2025",
    replyDate: "Jan 8, 2025",
    profileImage: "/images/Dummy-profile/Thomas-Brown.png"
  },
  {
    name: "Amanda Foster",
    subtitle: "E-commerce Business Owner",
    review: "The Walmart automation from Aain ali transformed our business completely. They handled our product listings, inventory management, and customer service automation. We're now one of the top sellers in our category with 95% positive feedback!",
    rating: 5,
    postDate: "Dec 14, 2024",
    replyDate: "Dec 15, 2024",
    profileImage: "/images/Dummy-profile/Amanda-Foster.png"
  },
  {
    name: "Kevin Lee",
    subtitle: "Online Retailer",
    review: "Working with Aain ali for Walmart automation has been incredible. They automated our pricing strategies, order processing, and returns management. Our profit margins improved by 200% and we're scaling to new product categories successfully!",
    rating: 5,
    postDate: "Nov 25, 2024",
    replyDate: "Nov 26, 2024",
    profileImage: "/images/Dummy-profile/Kevin-Lee.png"
  }
];

export default function WalmartPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <WalmartHeader />
      <Mission 
        useCustomContent={true}
        customTitle="Walmart automation built for clean ops and compounding sales"
        customDescription="From marketplace navigation to WFS, listings, and post-purchase experience—we run Walmart the way the channel rewards: fast fulfillment, strong catalog health, and tight operational discipline.

If you are expanding from another channel or launching net-new, we help you go live the right way—without cutting corners on compliance or customer experience."
        logoType="amazon"
      />
      <ImageGallery images={walmartImages} />
      <Testimonials testimonials={walmartTestimonials} />
      <WalmartBestServices />
      <Footer />
    </div>
  );
}