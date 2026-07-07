import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, Car } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { parkingLots } from '../data/dummyData';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lot = parkingLots.find((l) => l.id === id);

  const [form, setForm] = useState({ date: '', startTime: '', duration: 2, vehicle: '' });
  const [confirmed, setConfirmed] = useState(false);

  if (!lot) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-xl font-bold text-darktext mb-4">Parking lot not found</h2>
        <Link to="/browse"><Button variant="primary">Back to search</Button></Link>
      </div>
    );
  }

  const cost = lot.price * form.duration;

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-success" />
        </div>
        <h1 className="text-2xl font-bold text-darktext mb-2">Booking confirmed!</h1>
        <p className="text-sm text-lighttext mb-8">
          Your slot at {lot.name} is reserved. Details have been sent to your email.
        </p>

        <Card className="text-left mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-lighttext">Parking lot</span><span className="font-medium text-darktext">{lot.name}</span></div>
            <div className="flex justify-between"><span className="text-lighttext">Date</span><span className="font-medium text-darktext">{form.date || '—'}</span></div>
            <div className="flex justify-between"><span className="text-lighttext">Time</span><span className="font-medium text-darktext">{form.startTime || '—'} · {form.duration}h</span></div>
            <div className="flex justify-between"><span className="text-lighttext">Slot</span><span className="font-medium text-darktext">B-14</span></div>
            <div className="flex justify-between border-t border-border pt-3"><span className="text-lighttext">Total paid</span><span className="font-bold text-darktext">₹{cost}</span></div>
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
          <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
            Confirm & Reserve Slot
          </Button>
        </Card>
      </form>
    </div>
  );
}
