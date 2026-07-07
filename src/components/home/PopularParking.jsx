import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import ParkingCard from './ParkingCard';
import Button from '../ui/Button';
import { parkingLots } from '../../data/dummyData';

export default function PopularParking() {
  const featured = parkingLots.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-bgsoft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <SectionTitle
            eyebrow="Popular Locations"
            title="Top-rated parking near you"
            center={false}
          />
          <Link to="/browse">
            <Button variant="secondary" size="sm" icon={ArrowRight}>
              View all lots
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((lot) => (
            <ParkingCard key={lot.id} lot={lot} />
          ))}
        </div>
      </div>
    </section>
  );
}
