import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-primary rounded-2xl px-8 py-14 md:py-16 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-14 -left-10 w-56 h-56 rounded-full bg-white/10" />
          <h2 className="relative text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready to experience smarter parking?
          </h2>
          <p className="relative mt-3 text-primary-50 text-base max-w-md mx-auto">
            Join thousands of drivers who reserve their spot before they even leave home.
          </p>
          <Link to="/browse" className="relative inline-block mt-7">
            <Button variant="secondary" size="lg" icon={ArrowRight} className="bg-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
