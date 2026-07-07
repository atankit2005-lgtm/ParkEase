export default function SectionTitle({ eyebrow, title, description, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary-50 px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-darktext tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-lighttext text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
