import AmazonHeader from '../components/AmazonHeader';
import Mission from '../components/Mission';
import ImageGallery from '../components/ImageGallery';
import Testimonials from '../components/Testimonials';
import BestServices from '../components/BestServices';
import Footer from '../components/Footer';

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
      <ImageGallery />
      <Testimonials />
      <BestServices />
      <Footer />
    </div>
  );
}
