import { useState, useEffect } from 'react';
import { Building2, ParkingSquare, CalendarCheck, Layers, Search, Plus, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getAllBookings, getParkingLots, createParkingLot } from '../services/api';

const statusStyles = {
  confirmed: 'bg-primary-50 text-primary',
  Cancelled: 'bg-danger/10 text-danger',
  cancelled: 'bg-danger/10 text-danger',
};

const TABS = ['Overview', 'Parking Lots', 'Bookings'];

export default function AdminDashboard() {
  const { token, loading: authLoading } = useAuth();
  const [tab, setTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLot, setNewLot] = useState({
    name: '', address: '', city: '', totalSlots: '', availableSlots: '', pricePerHour: '', latitude: '', longitude: '',
  });
  const [addingLot, setAddingLot] = useState(false);
  const [addError, setAddError] = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([getDashboardStats(token), getAllBookings(token), getParkingLots()])
      .then(([statsData, bookingsData, lotsData]) => {
        setStats(statsData.stats);
        setBookings(bookingsData.bookings);
        setLots(lotsData.parkingLots);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!authLoading && token) {
      loadData();
    }
  }, [authLoading, token]);

  const filteredBookings = bookings.filter((b) =>
    (b.user?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.parkingLot?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleAddLot = async (e) => {
    e.preventDefault();
    setAddingLot(true);
    setAddError('');
    try {
      await createParkingLot(
        {
          ...newLot,
          totalSlots: Number(newLot.totalSlots),
          availableSlots: Number(newLot.availableSlots),
          pricePerHour: Number(newLot.pricePerHour),
          latitude: Number(newLot.latitude),
          longitude: Number(newLot.longitude),
        },
        token
      );
      setShowAddForm(false);
      setNewLot({ name: '', address: '', city: '', totalSlots: '', availableSlots: '', pricePerHour: '', latitude: '', longitude: '' });
      loadData(); // refresh everything so new lot shows up
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddingLot(false);
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-6 py-24 text-center text-lighttext">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-red-600 font-semibold mb-1">Couldn't load dashboard</p>
        <p className="text-sm text-lighttext">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-darktext">Admin Dashboard</h1>
          <p className="text-sm text-lighttext mt-1">Manage lots and bookings across ParkEase</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowAddForm(true)}>Add Parking Lot</Button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-lighttext hover:text-darktext'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { label: 'Total Lots', value: stats.totalParkingLots, icon: Building2 },
              { label: 'Available Slots', value: stats.availableSlots, icon: ParkingSquare },
              { label: 'Total Bookings', value: stats.totalBookings, icon: CalendarCheck },
              { label: 'Total Users', value: stats.totalUsers, icon: Layers },
            ].map((s) => (
              <Card key={s.label}>
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <s.icon size={18} className="text-primary" />
                </div>
                <p className="text-2xl font-bold text-darktext">{s.value}</p>
                <p className="text-sm text-lighttext mt-1">{s.label}</p>
              </Card>
            ))}
          </div>

          <Card>
            <h3 className="font-semibold text-darktext mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-lighttext border-b border-border">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Lot</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b._id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 text-darktext">{b.user?.name || '—'}</td>
                      <td className="py-3 text-lighttext">{b.parkingLot?.name || '—'}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status] || statusStyles.confirmed}`}>
                          {b.status || 'Booked'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-darktext">₹{b.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === 'Parking Lots' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-lighttext border-b border-border">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Area</th>
                  <th className="pb-3 font-medium">Total Slots</th>
                  <th className="pb-3 font-medium">Available</th>
                  <th className="pb-3 font-medium">Price/hr</th>
                </tr>
              </thead>
              <tbody>
                {lots.map((lot) => (
                  <tr key={lot._id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium text-darktext">{lot.name}</td>
                    <td className="py-3 text-lighttext">{lot.address}, {lot.city}</td>
                    <td className="py-3 text-darktext">{lot.totalSlots}</td>
                    <td className="py-3 text-darktext">{lot.availableSlots}</td>
                    <td className="py-3 text-darktext">₹{lot.pricePerHour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'Bookings' && (
        <div>
          <div className="max-w-sm mb-5">
            <Input
              icon={Search}
              placeholder="Search by user or lot..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-lighttext border-b border-border">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Lot</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 text-darktext">{b.user?.name || '—'}</td>
                      <td className="py-3 text-lighttext">{b.parkingLot?.name || '—'}</td>
                      <td className="py-3 text-lighttext">{new Date(b.bookingDate).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status] || statusStyles.confirmed}`}>
                          {b.status || 'Booked'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-darktext">₹{b.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-darktext text-lg">Add Parking Lot</h3>
              <button onClick={() => setShowAddForm(false)}><X size={20} className="text-lighttext" /></button>
            </div>
            <form onSubmit={handleAddLot} className="space-y-4">
              {addError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {addError}
                </div>
              )}
              <Input label="Name" required value={newLot.name} onChange={(e) => setNewLot({ ...newLot, name: e.target.value })} />
              <Input label="Address" required value={newLot.address} onChange={(e) => setNewLot({ ...newLot, address: e.target.value })} />
              <Input label="City" required value={newLot.city} onChange={(e) => setNewLot({ ...newLot, city: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Total Slots" type="number" required value={newLot.totalSlots} onChange={(e) => setNewLot({ ...newLot, totalSlots: e.target.value })} />
                <Input label="Available Slots" type="number" required value={newLot.availableSlots} onChange={(e) => setNewLot({ ...newLot, availableSlots: e.target.value })} />
              </div>
              <Input label="Price per hour (₹)" type="number" required value={newLot.pricePerHour} onChange={(e) => setNewLot({ ...newLot, pricePerHour: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Latitude" type="number" step="any" required value={newLot.latitude} onChange={(e) => setNewLot({ ...newLot, latitude: e.target.value })} />
                <Input label="Longitude" type="number" step="any" required value={newLot.longitude} onChange={(e) => setNewLot({ ...newLot, longitude: e.target.value })} />
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={addingLot}>
                {addingLot ? 'Adding...' : 'Add Parking Lot'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}