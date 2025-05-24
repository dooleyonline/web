import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { memo } from "react";

type IconName = keyof typeof dynamicIconImports;

type DynamicIconProps = {
  name: string;
  className?: string;
};

const DynamicIcon = memo(({ name, ...props }: DynamicIconProps) => {
  const Icon = dynamic(dynamicIconImports[name as IconName], { ssr: true });

  if (!Icon) {
    console.error(`Icon "${name}" not found in dynamicIconImports.`);
    return null;
  }

  return <Icon {...props} />;
});
DynamicIcon.displayName = "DynamicIcon";

export default DynamicIcon;
