import { useState } from 'react';
import { Building2, ParkingSquare, CalendarCheck, IndianRupee, Search, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { adminStats, adminBookings, parkingLots } from '../data/dummyData';

const statusStyles = {
  confirmed: 'bg-primary-50 text-primary',
  completed: 'bg-success/10 text-success',
  cancelled: 'bg-danger/10 text-danger',
};

const TABS = ['Overview', 'Parking Lots', 'Bookings'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('Overview');
  const [search, setSearch] = useState('');

  const filteredBookings = adminBookings.filter((b) =>
    b.user.toLowerCase().includes(search.toLowerCase()) ||
    b.lot.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-darktext">Admin Dashboard</h1>
          <p className="text-sm text-lighttext mt-1">Manage lots, slots, and bookings across ParkEase</p>
        </div>
        <Button variant="primary" icon={Plus}>Add Parking Lot</Button>
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
              { label: 'Total Lots', value: adminStats.totalLots, icon: Building2 },
              { label: 'Total Slots', value: adminStats.totalSlots.toLocaleString(), icon: ParkingSquare },
              { label: 'Active Bookings', value: adminStats.activeBookings, icon: CalendarCheck },
              { label: "Today's Revenue", value: `₹${adminStats.todayRevenue.toLocaleString()}`, icon: IndianRupee },
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
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Lot</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {adminBookings.slice(0, 4).map((b) => (
                    <tr key={b.id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 font-medium text-darktext">{b.id}</td>
                      <td className="py-3 text-darktext">{b.user}</td>
                      <td className="py-3 text-lighttext">{b.lot}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-darktext">₹{b.amount}</td>
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
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parkingLots.map((lot) => (
                  <tr key={lot.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium text-darktext">{lot.name}</td>
                    <td className="py-3 text-lighttext">{lot.area}</td>
                    <td className="py-3 text-darktext">{lot.totalSlots}</td>
                    <td className="py-3 text-darktext">{lot.availableSlots}</td>
                    <td className="py-3 text-darktext">₹{lot.price}</td>
                    <td className="py-3 text-right">
                      <button className="text-primary text-xs font-semibold hover:underline">Edit</button>
                    </td>
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
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Lot</th>
                    <th className="pb-3 font-medium">Slot</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 font-medium text-darktext">{b.id}</td>
                      <td className="py-3 text-darktext">{b.user}</td>
                      <td className="py-3 text-lighttext">{b.lot}</td>
                      <td className="py-3 text-lighttext">{b.slot}</td>
                      <td className="py-3 text-lighttext">{b.date}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-darktext">₹{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
