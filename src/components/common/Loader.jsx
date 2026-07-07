export default function Loader({ full = false }) {
  const wrapper = full
    ? 'min-h-[60vh] flex items-center justify-center'
    : 'flex items-center justify-center py-10';

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-lighttext">Loading...</span>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden animate-pulse">
      <div className="h-40 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-200 rounded w-full" />
      </div>
    </div>
  );
}
