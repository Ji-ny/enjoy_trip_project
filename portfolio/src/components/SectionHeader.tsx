import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <span className={`${styles.badge} text-xs font-semibold uppercase tracking-wider text-primary-600`}>{eyebrow}</span>
      <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {description && <p className="max-w-3xl text-sm text-slate-600">{description}</p>}
    </div>
  );
}
