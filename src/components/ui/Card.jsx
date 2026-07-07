export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-card rounded-2xl shadow-card border border-border/60 p-6
        ${hover ? 'transition-all duration-300 hover:shadow-soft hover:-translate-y-1' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
