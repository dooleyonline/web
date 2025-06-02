import { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
};

const Section = ({ id, children }: SectionProps) => {
  return (
    <section id={id} className="mb-10">
      {children}
    </section>
  );
};
export default Section;

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: ReactNode;
};

export const SectionHeader = ({
  title,
  subtitle,
  className,
  icon,
}: SectionHeaderProps) => {
  return (
    <div className="flex gap-2 items-center mb-4">
      {icon && (
        <div className="rounded-full flex p-2 bg-muted text-primary text-3xl">
          {icon}
        </div>
      )}
      <div className={className}>
        <h2>{title}</h2>
        {subtitle && (
          <p className={"text-sm font-base text-muted-foreground"}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
