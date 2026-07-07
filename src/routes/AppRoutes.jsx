import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import BrowseParking from '../pages/BrowseParking';
import ParkingDetails from '../pages/ParkingDetails';
import Booking from '../pages/Booking';
import Bookings from '../pages/Bookings';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/browse" element={<BrowseParking />} />
      <Route path="/parking/:id" element={<ParkingDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      {/* Kept open (no login gate) so it's easy to demo — wrap with
          <ProtectedRoute adminOnly> once real admin auth is wired up */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
