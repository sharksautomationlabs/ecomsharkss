import WalmartHeader from '../components/WalmartHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import WalmartBestServices from '../components/WalmartBestServices';
import Footer from '../components/Footer';

export default function WalmartPage() {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <WalmartHeader />
      <Mission 
        useCustomContent={true}
        customTitle="Sky-Rocket Your Walmart Venture with Our Premium Walmart Automation Services"
        customDescription="Our TikTok Automation Services are designed to elevate your brand's presence and drive engagement on this rapidly growing platform. We offer a range of services, from account setup and management to content creation and audience targeting, all tailored to meet your specific business goals.

Our team of experts is well-versed with the latest TikTok trends and algorithms, ensuring that your brand stays relevant and visible to your target audience. Whether you're looking to launch a new product, increase brand awareness, or drive sales, we can help you achieve your goals."
        logoType="amazon"
      />
      <ImageGallery />
      <Testimonials />
      <WalmartBestServices />
      <Footer />
    </div>
  );
}