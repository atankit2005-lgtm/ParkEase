import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, MapPin, X } from 'lucide-react';
import ParkingCard from '../components/home/ParkingCard';
import Button from '../components/ui/Button';
import { parkingLots } from '../data/dummyData';

const SORT_OPTIONS = [
  { value: 'distance', label: 'Nearest first' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'rating', label: 'Highest rated' },
];

export default function BrowseParking() {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location') || '';

  const [sortBy, setSortBy] = useState('distance');
  const [maxPrice, setMaxPrice] = useState(50);
  const [coveredOnly, setCoveredOnly] = useState(false);
  const [evOnly, setEvOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = parkingLots.filter((lot) => lot.price <= maxPrice);
    if (coveredOnly) list = list.filter((l) => l.covered);
    if (evOnly) list = list.filter((l) => l.evCharging);
    if (locationQuery) {
      list = list.filter((l) =>
        l.area.toLowerCase().includes(locationQuery.toLowerCase()) ||
        l.name.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [sortBy, maxPrice, coveredOnly, evOnly, locationQuery]);

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

    {/* Amenities */}
    <div>
      <p className="text-sm font-semibold text-darktext mb-3">Amenities</p>
      <div className="space-y-2">
        <label className="flex items-center gap-2.5 text-sm text-darktext cursor-pointer">
          <input
            type="checkbox"
            checked={coveredOnly}
            onChange={(e) => setCoveredOnly(e.target.checked)}
            className="accent-primary w-4 h-4 rounded"
          />
          Covered parking only
        </label>

        <label className="flex items-center gap-2.5 text-sm text-darktext cursor-pointer">
          <input
            type="checkbox"
            checked={evOnly}
            onChange={(e) => setEvOnly(e.target.checked)}
            className="accent-primary w-4 h-4 rounded"
          />
          EV charging available
        </label>
      </div>
    </div>

    {/* Clear Filters */}
    <div className="pt-4 border-t border-border/60">
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => {
          setSortBy('distance');
          setMaxPrice(50);
          setCoveredOnly(false);
          setEvOnly(false);
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
          <p className="text-sm text-lighttext mb-4">{results.length} parking lots found</p>
          {results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border/60 p-12 text-center">
              <p className="text-darktext font-semibold mb-1">No lots match your filters</p>
              <p className="text-sm text-lighttext mb-5">
                Try increasing your max price or clearing amenity filters.
              </p>

              <Button
                variant="secondary"
                onClick={() => {
                  setSortBy("distance");
                  setMaxPrice(50);
                  setCoveredOnly(false);
                  setEvOnly(false);
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
