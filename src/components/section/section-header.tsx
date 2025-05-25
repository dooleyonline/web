interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="mb-4">
      <h2>{title}</h2>
      {subtitle && (
        <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
