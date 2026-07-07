import { useState } from 'react';
import { User, Mail, Phone, Car, Save } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || 'Ankit Sharma',
    email: user?.email || 'ankit@example.com',
    phone: '98765 43210',
    vehicle: 'PB08 AB 1234',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-darktext mb-1">Profile</h1>
      <p className="text-sm text-lighttext mb-8">Manage your personal information</p>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary font-bold text-xl">
          {form.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-darktext">{form.name}</p>
          <p className="text-sm text-lighttext">{form.email}</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSave} className="space-y-5">
          <Input
            label="Full name"
            icon={User}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email address"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Phone number"
            icon={Phone}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Default vehicle number"
            icon={Car}
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          />

          <Button type="submit" variant="primary" icon={Save} className="w-full">
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
