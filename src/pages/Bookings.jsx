import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { getUserBookings, cancelBooking } from '../services/api';

const statusStyles = {
  confirmed: 'bg-primary-50 text-primary',
  completed: 'bg-success/10 text-success',
  cancelled: 'bg-danger/10 text-danger',
  Cancelled: 'bg-danger/10 text-danger',
};

export default function Bookings() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    getUserBookings(user.id, token)
      .then((data) => setBookings(data.bookings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, token]);

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId, token);
      // Update just that one booking's status locally, no need to refetch everything
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'Cancelled' } : b))
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-darktext mb-1">My Bookings</h1>
      <p className="text-sm text-lighttext mb-8">Your parking reservations</p>

      {loading ? (
        <p className="text-sm text-lighttext">Loading your bookings...</p>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-200 p-12 text-center">
          <p className="text-red-600 font-semibold mb-1">Couldn't load your bookings</p>
          <p className="text-sm text-lighttext">{error}</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/60 p-12 text-center">
          <p className="text-darktext font-semibold mb-1">No bookings yet</p>
          <p className="text-sm text-lighttext">Reservations you make will show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const isCancelled = b.status === 'Cancelled' || b.status === 'cancelled';
            return (
              <div
                key={b._id}
                className="bg-white rounded-2xl border border-border/60 p-5"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-darktext">{b.parkingLot?.name || 'Parking lot'}</h3>
                    <p className="text-xs text-lighttext flex items-center gap-1.5 mt-1">
                      <MapPin size={12} /> {b.parkingLot?.address}, {b.parkingLot?.city}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status] || statusStyles.confirmed}`}>
                    {isCancelled ? 'Cancelled' : (b.status || 'Booked')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-xs text-lighttext">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {new Date(b.bookingDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {b.startTime} – {b.endTime}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm font-bold text-darktext">₹{b.totalAmount}</p>
                  {!isCancelled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={X}
                      onClick={() => {
                        if (confirm('Cancel this booking?')) handleCancel(b._id);
                      }}
                      disabled={cancellingId === b._id}
                      className="text-danger hover:bg-danger/10"
                    >
                      {cancellingId === b._id ? 'Cancelling...' : 'Cancel'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}