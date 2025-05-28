import { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
}

export const Section = ({ id, children }: SectionProps) => {
  return (
    <section id={id} className="mb-10">
      {children}
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="mb-4">
      <h2>{title}</h2>
      {subtitle && (
        <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

