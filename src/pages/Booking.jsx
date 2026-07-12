import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, Car } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { getParkingLotById, createBooking } from '../services/api';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();

  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({ date: '', startTime: '', duration: 2, vehicle: '' });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    getParkingLotById(id)
      .then((data) => {
        const l = data.parkingLot;
        setLot({
          id: l._id,
          name: l.name,
          area: `${l.address}, ${l.city}`,
          price: l.pricePerHour,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-6 py-24 text-center text-lighttext">Loading...</div>;
  }

  if (error || !lot) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-xl font-bold text-darktext mb-2">Parking lot not found</h2>
        <p className="text-sm text-lighttext mb-6">{error || 'It may have been removed or the link is incorrect.'}</p>
        <Link to="/browse"><Button variant="primary">Back to search</Button></Link>
      </div>
    );
  }

  const cost = lot.price * form.duration;

  function calculateEndTime(startTime, durationHours) {
    const [h, m] = startTime.split(':').map(Number);
    const totalMinutes = h * 60 + m + durationHours * 60;
    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  }

  const handleConfirm = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const endTime = calculateEndTime(form.startTime, form.duration);
      await createBooking(
        {
          user: user.id,
          parkingLot: lot.id,
          bookingDate: form.date,
          startTime: form.startTime,
          endTime,
          totalAmount: cost,
        },
        token
      );
      setConfirmed(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-success" />
        </div>
        <h1 className="text-2xl font-bold text-darktext mb-2">Booking confirmed!</h1>
        <p className="text-sm text-lighttext mb-8">
          Your slot at {lot.name} is reserved.
        </p>

        <Card className="text-left mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-lighttext">Parking lot</span><span className="font-medium text-darktext">{lot.name}</span></div>
            <div className="flex justify-between"><span className="text-lighttext">Date</span><span className="font-medium text-darktext">{form.date || '—'}</span></div>
            <div className="flex justify-between"><span className="text-lighttext">Time</span><span className="font-medium text-darktext">{form.startTime || '—'} · {form.duration}h</span></div>
            <div className="flex justify-between border-t border-border pt-3"><span className="text-lighttext">Total</span><span className="font-bold text-darktext">₹{cost}</span></div>
          </div>
        </Card>

        <div className="flex gap-3 justify-center">
          <Link to="/bookings"><Button variant="primary">View My Bookings</Button></Link>
          <Link to="/"><Button variant="secondary">Back Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-darktext mb-1">Confirm your booking</h1>
      <p className="text-sm text-lighttext mb-8">{lot.name} · {lot.area}</p>

      <form onSubmit={handleConfirm} className="grid md:grid-cols-2 gap-8">
        <Card className="md:col-span-2 space-y-5">
          {submitError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {submitError}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Date"
              type="date"
              icon={Calendar}
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Input
              label="Start time"
              type="time"
              icon={Clock}
              required
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-darktext mb-1.5">Duration</label>
            <select
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
              className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {[1, 2, 3, 4, 6, 8, 12].map((h) => (
                <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <Input
            label="Vehicle number"
            icon={Car}
            placeholder="PB08 AB 1234"
            required
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          />
        </Card>

        <Card className="md:col-span-2">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-lighttext">Rate</span>
            <span className="text-darktext">₹{lot.price}/hr × {form.duration}h</span>
          </div>
          <div className="flex justify-between text-base font-bold border-t border-border pt-3 mt-3">
            <span className="text-darktext">Total</span>
            <span className="text-primary">₹{cost}</span>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full mt-6" disabled={submitting}>
            {submitting ? 'Reserving...' : 'Confirm & Reserve Slot'}
          </Button>
        </Card>
      </form>
    </div>
  );
}