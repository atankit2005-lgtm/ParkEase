import { Link } from 'react-router-dom';
import { Star, Zap, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function ParkingCard({ lot }) {
  const isFull = lot.availableSlots === 0;

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-soft hover:-translate-y-1 group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={lot.image}
          alt={lot.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {lot.covered && (
            <span className="bg-white/90 backdrop-blur text-xs font-medium px-2.5 py-1 rounded-full text-darktext">
              Covered
            </span>
          )}
          {lot.evCharging && (
            <span className="bg-white/90 backdrop-blur text-xs font-medium px-2.5 py-1 rounded-full text-darktext flex items-center gap-1">
              <Zap size={11} /> EV
            </span>
          )}
        </div>
        <div
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isFull
              ? 'bg-danger/90 text-white'
              : 'bg-success/90 text-white'
          }`}
        >
          {isFull ? 'Full' : `${lot.availableSlots} free`}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-darktext text-base leading-snug">
              {lot.name}
            </h3>
            <p className="text-xs text-lighttext mt-0.5">{lot.area}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-darktext shrink-0">
            <Star size={13} className="fill-warning text-warning" />
            {lot.rating}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-lighttext">{lot.distance}</p>
          <p className="text-sm font-bold text-darktext">
            ₹{lot.price}<span className="text-xs font-normal text-lighttext">/hr</span>
          </p>
        </div>

        <Link to={`/parking/${lot.id}`}>
          <Button
            variant={isFull ? 'ghost' : 'primary'}
            size="sm"
            className="w-full mt-4"
            disabled={isFull}
          >
            {isFull ? 'Fully Booked' : 'Book Now'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
