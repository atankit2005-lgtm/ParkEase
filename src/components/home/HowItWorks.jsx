import { Search, CalendarCheck, ParkingSquare } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const steps = [
  {
    icon: Search,
    title: 'Search',
    desc: 'Enter your destination, date, and arrival time to see nearby lots.',
  },
  {
    icon: CalendarCheck,
    title: 'Reserve',
    desc: 'Pick a slot, confirm your booking, and get instant confirmation.',
  },
  {
    icon: ParkingSquare,
    title: 'Park',
    desc: 'Arrive, head straight to your reserved slot, and skip the search.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          eyebrow="How It Works"
          title="Three steps between you and a guaranteed spot"
        />
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-5 shadow-soft">
                <s.icon size={26} />
              </div>
              <h3 className="font-semibold text-lg text-darktext mb-2">
                {i + 1}. {s.title}
              </h3>
              <p className="text-sm text-lighttext leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
