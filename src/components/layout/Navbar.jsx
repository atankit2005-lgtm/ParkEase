import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ParkingSquare, Menu, X, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-darktext hover:text-primary'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ParkingSquare size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-darktext">ParkEase</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/browse" className={navLinkClass}>
            Find Parking
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-darktext hover:text-primary transition-colors"
              >
                <User size={16} />
                {user?.name || 'Profile'}
              </Link>
              <Button variant="ghost" size="sm" icon={LogOut} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-darktext"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4 animate-fade-up">
          <NavLink to="/" className={navLinkClass} end onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/browse" className={navLinkClass} onClick={() => setMobileOpen(false)}>Find Parking</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setMobileOpen(false)}>Contact</NavLink>
          {isAuthenticated && (
            <NavLink to="/bookings" className={navLinkClass} onClick={() => setMobileOpen(false)}>My Bookings</NavLink>
          )}
          <div className="flex gap-3 pt-2 border-t border-border">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Link to="/login" className="w-full" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" className="w-full" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
