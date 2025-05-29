import { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
};

export const Section = ({ id, children }: SectionProps) => {
  return (
    <section id={id} className="mb-10">
      {children}
    </section>
  );
};

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const SectionHeader = ({
  title,
  subtitle,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {subtitle && (
        <p className={"text-sm font-medium text-muted-foreground"}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
