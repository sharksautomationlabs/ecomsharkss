import Header from './components/Header';
import Services from './components/Services';
import Mission from './components/Mission';
import Quote from './components/Qoute';
import Experts from './components/Experts';
import Results from './components/Results';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Owners from './components/Owners';
import Careers from './components/careers';
import Opportunities from './components/opportunities';
import CurrentOffer from './components/CurrentOffer';
// import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="w-full bg-white">
      {/* Header includes both header navigation and hero sections as per Figma design */}
      <Header />
      <Experts />
      <CurrentOffer />
      <Services />
      <Mission />
      <Quote />
      <Results />
      <Pricing />
      <Testimonials />
      <Owners />
      <Careers />
      <Opportunities />
      <Footer />
    </div>
  );
}
