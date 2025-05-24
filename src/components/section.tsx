import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const Section = ({ id, title, subtitle, children }: SectionProps) => {
  return (
    <section id={id} className="mb-10">
      <div className="mb-4">
        <h2>{title}</h2>
        {subtitle && (
          <p className="text-sm font-medium text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
