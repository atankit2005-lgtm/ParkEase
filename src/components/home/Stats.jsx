import { stats } from '../../data/dummyData';

export default function Stats() {
  return (
    <section className="border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm text-lighttext font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
