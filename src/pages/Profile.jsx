import { useState } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';

export default function Profile() {
  const { user, token, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const data = await updateProfile({ name: form.name, phone: form.phone }, token);
      // Refresh the stored user info with the updated data
      login(data.user, token);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-darktext mb-1">Profile</h1>
      <p className="text-sm text-lighttext mb-8">Manage your personal information</p>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary font-bold text-xl">
          {form.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-darktext">{form.name}</p>
          <p className="text-sm text-lighttext">{user?.email}</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSave} className="space-y-5">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
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
            value={user?.email || ''}
            disabled
          />
          <Input
            label="Phone number"
            icon={Phone}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <Button type="submit" variant="primary" icon={Save} className="w-full" disabled={saving}>
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </div>
  );
}