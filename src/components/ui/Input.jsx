export default function Input({
  label,
  icon: Icon,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-darktext mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lighttext"
          />
        )}
        <input
          className={`w-full rounded-xl border border-border bg-white text-darktext placeholder:text-lighttext/70
            py-2.5 ${Icon ? 'pl-11' : 'pl-4'} pr-4
            focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none
            transition-all duration-200 ${error ? 'border-danger' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
