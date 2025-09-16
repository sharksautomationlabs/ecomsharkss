import TikTokHeader from '../components/TikTokHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import TikTokBestServices from '../components/TikTokBestServices';
import Footer from '../components/Footer';

export default function TikTokPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <TikTokHeader />
      <Mission 
        useCustomContent={true}
        customTitle="Maximize Your Brand's Impact with Our TikTok Automation Services"
        customDescription="Our TikTok Automation Services are designed to elevate your brand's presence and drive engagement on this rapidly growing platform. We offer a range of services, from account setup and management to content creation and audience targeting, all tailored to meet your specific business goals.

Our team of experts is well-versed with the latest TikTok trends and algorithms, ensuring that your brand stays relevant and visible to your target audience. Whether you're looking to launch a new product, increase brand awareness, or drive sales, we can help you achieve your goals."
        logoType="shopify"
      />
      <ImageGallery />
      <Testimonials />
      <TikTokBestServices />
      <Footer />
    </div>
  );
}