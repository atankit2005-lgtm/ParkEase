import { Target, Users, Rocket } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="About Us"
        title="Built to end the parking guessing game"
        description="ParkEase started as a simple frustration — circling the block looking for a spot — and turned into a platform that makes parking predictable."
      />

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card>
          <Target size={22} className="text-primary mb-3" />
          <h3 className="font-semibold text-darktext mb-2">Our Mission</h3>
          <p className="text-sm text-lighttext leading-relaxed">
            Make parking a five-second decision instead of a fifteen-minute search.
          </p>
        </Card>
        <Card>
          <Users size={22} className="text-primary mb-3" />
          <h3 className="font-semibold text-darktext mb-2">Who We Serve</h3>
          <p className="text-sm text-lighttext leading-relaxed">
            Daily commuters, event-goers, and visitors navigating unfamiliar areas.
          </p>
        </Card>
        <Card>
          <Rocket size={22} className="text-primary mb-3" />
          <h3 className="font-semibold text-darktext mb-2">Where We're Headed</h3>
          <p className="text-sm text-lighttext leading-relaxed">
            Expanding to more cities with smarter, AI-driven availability predictions.
          </p>
        </Card>
      </div>
    </div>
  );
}
