import ScrollReveal from './ScrollReveal'

export default function SectionHeading({ subtitle, title, description }) {
  return (
    <ScrollReveal>
      <div className="section-heading-wrapper">
        {subtitle && (
          <span className="inline-block text-brand-green font-semibold text-[11px] tracking-[3px] uppercase mb-3">
            {subtitle}
          </span>
        )}
        <h2 className="text-h2 text-black leading-[1.12] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="subtitle text-[#64748b] text-body px-5">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}
