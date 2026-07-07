import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import PopularParking from '../components/home/PopularParking';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <PopularParking />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
