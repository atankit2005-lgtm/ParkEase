import { useState } from 'react';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { myBookings as initialBookings } from '../data/dummyData';

const statusStyles = {
  confirmed: 'bg-primary-50 text-primary',
  completed: 'bg-success/10 text-success',
  cancelled: 'bg-danger/10 text-danger',
};

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('all');

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-darktext mb-1">My Bookings</h1>
      <p className="text-sm text-lighttext mb-6">Manage your upcoming and past reservations</p>

      <div className="flex gap-2 mb-8">
        {['all', 'confirmed', 'completed', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-primary text-white' : 'bg-white border border-border text-lighttext hover:text-darktext'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/60 p-12 text-center">
          <p className="text-darktext font-semibold mb-1">No bookings here</p>
          <p className="text-sm text-lighttext">Reservations matching this filter will show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-border/60 p-5 flex flex-col sm:flex-row gap-5"
            >
              <img src={b.image} alt={b.lotName} className="w-full sm:w-32 h-28 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-darktext">{b.lotName}</h3>
                    <p className="text-xs text-lighttext flex items-center gap-1.5 mt-1">
                      <MapPin size={12} /> {b.area}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-xs text-lighttext">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {b.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {b.startTime} – {b.endTime}</span>
                  <span>Slot {b.slot}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm font-bold text-darktext">₹{b.cost}</p>
                  {b.status === 'confirmed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={X}
                      onClick={() => handleCancel(b.id)}
                      className="text-danger hover:bg-danger/10"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
