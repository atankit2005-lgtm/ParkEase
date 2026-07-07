import { Link } from 'react-router-dom';
import { ParkingSquare } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
        <ParkingSquare size={28} className="text-primary" />
      </div>
      <h1 className="text-6xl font-extrabold text-darktext mb-2">404</h1>
      <p className="text-lg font-semibold text-darktext mb-2">This spot doesn't exist</p>
      <p className="text-sm text-lighttext mb-8 max-w-sm">
        The page you're looking for has been moved or never existed. Let's get you back on track.
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}
