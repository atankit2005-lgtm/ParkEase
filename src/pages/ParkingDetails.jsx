import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Zap, ShieldCheck, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { parkingLots } from '../data/dummyData';

export default function ParkingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lot = parkingLots.find((l) => l.id === id);

  if (!lot) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-xl font-bold text-darktext mb-2">Parking lot not found</h2>
        <p className="text-sm text-lighttext mb-6">It may have been removed or the link is incorrect.</p>
        <Link to="/browse">
          <Button variant="primary">Back to search</Button>
        </Link>
      </div>
    );
  }

  const slots = Array.from({ length: 24 }, (_, i) => ({
    number: `${String.fromCharCode(65 + Math.floor(i / 8))}-${(i % 8) + 1}`,
    occupied: i % 3 === 0,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-lighttext hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <div>
          <div className="rounded-2xl overflow-hidden h-72 md:h-96 mb-6">
            <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-darktext">{lot.name}</h1>
              <p className="text-sm text-lighttext flex items-center gap-1.5 mt-1.5">
                <MapPin size={14} /> {lot.area} · {lot.distance}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-darktext bg-white border border-border rounded-full px-3 py-1.5">
              <Star size={14} className="fill-warning text-warning" />
              {lot.rating} <span className="text-lighttext font-normal">({lot.reviews})</span>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            {lot.covered && (
              <span className="flex items-center gap-1.5 text-sm bg-primary-50 text-primary px-3 py-1.5 rounded-full font-medium">
                <ShieldCheck size={14} /> Covered
              </span>
            )}
            {lot.evCharging && (
              <span className="flex items-center gap-1.5 text-sm bg-primary-50 text-primary px-3 py-1.5 rounded-full font-medium">
                <Zap size={14} /> EV Charging
              </span>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-darktext mb-4">Select a slot</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {slots.map((s) => (
                <button
                  key={s.number}
                  disabled={s.occupied}
                  className={`aspect-square rounded-lg text-xs font-semibold flex items-center justify-center border transition-all ${
                    s.occupied
                      ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'bg-success/10 text-success border-success/30 hover:bg-success hover:text-white cursor-pointer'
                  }`}
                >
                  {s.number}
                </button>
              ))}
            </div>
            <div className="flex gap-5 mt-4 text-xs text-lighttext">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-success/20 border border-success/40 inline-block" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 inline-block" /> Occupied
              </span>
            </div>
          </div>
        </div>

        <div>
          <Card className="sticky top-24">
            <p className="text-sm text-lighttext mb-1">Price</p>
            <p className="text-3xl font-bold text-darktext mb-5">
              ₹{lot.price}<span className="text-base font-normal text-lighttext">/hour</span>
            </p>
            <div className="space-y-3 text-sm border-t border-border pt-5">
              <div className="flex justify-between">
                <span className="text-lighttext">Total slots</span>
                <span className="font-medium text-darktext">{lot.totalSlots}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lighttext">Available now</span>
                <span className="font-medium text-success">{lot.availableSlots}</span>
              </div>
            </div>
            <Link to={`/booking/${lot.id}`}>
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-6"
                disabled={lot.availableSlots === 0}
              >
                {lot.availableSlots === 0 ? 'Fully Booked' : 'Continue to Booking'}
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
