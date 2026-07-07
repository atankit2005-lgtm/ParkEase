import { Zap, MapPinned, ShieldCheck, CreditCard, BellRing, Headphones } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Availability',
    desc: 'See exactly how many slots are free before you even start driving.',
  },
  {
    icon: MapPinned,
    title: 'GPS-Based Search',
    desc: 'Find the nearest parking lots to your destination, sorted by distance.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Booking',
    desc: 'Your reservation is locked in the moment you confirm — no double bookings.',
  },
  {
    icon: CreditCard,
    title: 'Cashless Payments',
    desc: 'Pay securely online and skip the ticket counter entirely.',
  },
  {
    icon: BellRing,
    title: 'Instant Confirmation',
    desc: 'Get your slot number and confirmation the second you book.',
  },
  {
    icon: Headphones,
    title: '24×7 Support',
    desc: 'Run into an issue at the lot? Our support team is always reachable.',
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-bgsoft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          eyebrow="Why ParkEase"
          title="Everything you need, nothing you don't"
          description="Built around the one thing that matters — getting you into a parking spot without the stress."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} hover className="text-left">
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-darktext text-base mb-1.5">{f.title}</h3>
              <p className="text-sm text-lighttext leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
