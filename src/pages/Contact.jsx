import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-darktext">Get in touch</h1>
        <p className="text-lighttext mt-3">Questions, feedback, or partnership ideas — we'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-8">
        <div className="space-y-4">
          <Card className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-lighttext">Email</p>
              <p className="text-sm font-medium text-darktext">support@parkease.app</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-lighttext">Phone</p>
              <p className="text-sm font-medium text-darktext">+91 98765 43210</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-lighttext">Office</p>
              <p className="text-sm font-medium text-darktext">LPU, Phagwara, Punjab</p>
            </div>
          </Card>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Email address"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-darktext mb-1.5">Message</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder="How can we help?"
              />
            </div>
            <Button type="submit" variant="primary" icon={Send} className="w-full">
              {sent ? 'Message sent!' : 'Send Message'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
