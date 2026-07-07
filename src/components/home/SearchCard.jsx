import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';
import Button from '../ui/Button';

export default function SearchCard() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (date) params.set('date', date);
    if (time) params.set('time', time);
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-soft border border-border/60 p-5 md:p-6 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative sm:col-span-1">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-lighttext mb-1.5">
            <MapPin size={14} /> Location
          </label>
          <input
            type="text"
            placeholder="Enter destination"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="relative">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-lighttext mb-1.5">
            <Calendar size={14} /> Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="relative">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-lighttext mb-1.5">
            <Clock size={14} /> Arrival Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" icon={Search} className="w-full mt-5">
        Find Available Slots
      </Button>
    </form>
  );
}
