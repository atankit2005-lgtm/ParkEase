export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary:
      'bg-white text-primary border border-primary hover:bg-primary-50 active:scale-[0.98]',
    ghost:
      'bg-transparent text-darktext hover:bg-slate-100 active:scale-[0.98]',
    danger:
      'bg-danger text-white hover:bg-red-600 active:scale-[0.98]',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
