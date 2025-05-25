"use client";

import { Loader } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { memo } from "react";

type IconName = keyof typeof dynamicIconImports;

interface DynamicIconProps {
  name: string;
  className?: string;
  [key: string]: unknown;
}

const DynamicIcon = memo(({ name, ...props }: DynamicIconProps) => {
  const Icon = dynamic(dynamicIconImports[name as IconName], {
    ssr: true,
    loading: () => <Loader className={`${props.className} animate-spin`} />,
  });

  if (!Icon) {
    console.error(`Icon "${name}" not found in dynamicIconImports.`);
    return <Loader className={props.className} />;
  }

  return <Icon {...props} />;
});
DynamicIcon.displayName = "DynamicIcon";

export default DynamicIcon;
