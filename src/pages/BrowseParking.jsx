import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, MapPin, X } from 'lucide-react';
import ParkingCard from '../components/home/ParkingCard';
import Button from '../components/ui/Button';
import { getParkingLots } from '../services/api';

const SORT_OPTIONS = [
  { value: 'distance', label: 'Nearest first' },
  { value: 'price', label: 'Price: Low to High' },
];

export default function BrowseParking() {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location') || '';

  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [sortBy, setSortBy] = useState('distance');
  const [maxPrice, setMaxPrice] = useState(50);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    getParkingLots()
      .then((data) => {
        // Map real backend fields into the shape our cards expect
        const mapped = data.parkingLots.map((lot) => ({
          id: lot._id,
          name: lot.name,
          area: `${lot.address}, ${lot.city}`,
          price: lot.pricePerHour,
          availableSlots: lot.availableSlots,
          totalSlots: lot.totalSlots,
          image: lot.image || 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&q=80',
          distance: '', // not available yet — needs user location
          covered: false, // not tracked in backend yet
          evCharging: false, // not tracked in backend yet
        }));
        setLots(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    let list = lots.filter((lot) => lot.price <= maxPrice);
    if (locationQuery) {
      list = list.filter((l) =>
        l.area.toLowerCase().includes(locationQuery.toLowerCase()) ||
        l.name.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }, [lots, sortBy, maxPrice, locationQuery]);

  const FilterPanel = (
  <div className="space-y-6">
    {/* Sort By */}
    <div>
      <p className="text-sm font-semibold text-darktext mb-3">Sort by</p>
      <div className="space-y-2">
        {SORT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2.5 text-sm text-darktext cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              checked={sortBy === opt.value}
              onChange={() => setSortBy(opt.value)}
              className="accent-primary w-4 h-4"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>

    {/* Max Price */}
    <div>
      <p className="text-sm font-semibold text-darktext mb-3">
        Max price: <span className="text-primary">₹{maxPrice}/hr</span>
      </p>
      <input
        type="range"
        min="10"
        max="50"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>

    {/* Clear Filters */}
    <div className="pt-4 border-t border-border/60">
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => {
          setSortBy('distance');
          setMaxPrice(50);
        }}
      >
        Clear Filters
      </Button>
    </div>
  </div>
);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-darktext">Find Parking</h1>
          <p className="text-sm text-lighttext mt-1 flex items-center gap-1.5">
            <MapPin size={14} />
            {locationQuery ? `Showing results near "${locationQuery}"` : 'Showing all available lots'}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={SlidersHorizontal}
          className="lg:hidden"
          onClick={() => setFiltersOpen(true)}
        >
          Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8 mt-8">
        <aside className="hidden lg:block">
          <div className="bg-white rounded-2xl border border-border/60 p-5 sticky top-24">
            {FilterPanel}
          </div>
        </aside>

        <div>
          {loading ? (
            <p className="text-sm text-lighttext">Loading parking lots...</p>
          ) : error ? (
            <div className="bg-white rounded-2xl border border-red-200 p-12 text-center">
              <p className="text-red-600 font-semibold mb-1">Couldn't load parking lots</p>
              <p className="text-sm text-lighttext">{error}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-lighttext mb-4">{results.length} parking lots found</p>
              {results.length === 0 ? (
                <div className="bg-white rounded-2xl border border-border/60 p-12 text-center">
                  <p className="text-darktext font-semibold mb-1">No lots match your filters</p>
                  <p className="text-sm text-lighttext mb-5">
                    Try increasing your max price or clearing filters.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSortBy('distance');
                      setMaxPrice(50);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map((lot) => (
                    <ParkingCard key={lot.id} lot={lot} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white p-6 overflow-y-auto animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-darktext">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}>
                <X size={20} className="text-lighttext" />
              </button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  );
}