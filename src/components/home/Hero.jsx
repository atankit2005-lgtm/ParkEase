import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import Button from '../ui/Button';
import SearchCard from './SearchCard';
import ParkingIllustration from './ParkingIllustration';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fade-up">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary-50 px-3 py-1.5 rounded-full mb-5">
              Smart Parking Reservation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-darktext leading-[1.1] tracking-tight">
              Slot In, <span className="text-primary">Stress Out.</span>
            </h1>
            <p className="mt-5 text-lg text-lighttext leading-relaxed max-w-lg">
              Reserve your parking spot before you even leave home. Real-time
              availability, zero circling, guaranteed slot.
            </p>

            <div className="mt-8">
              <SearchCard />
            </div>

            <div className="mt-6 flex items-center gap-6">
              <Link to="/browse">
                <Button variant="ghost" size="sm" icon={PlayCircle}>
                  See how it works
                </Button>
              </Link>
            </div>
          </div>

          <ParkingIllustration />
        </div>
      </div>
    </section>
  );
}
