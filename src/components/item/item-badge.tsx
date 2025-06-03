import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

type ItemConditionBadgeProps = {
  condition: number;
};

export const ItemConditionBadge = ({ condition }: ItemConditionBadgeProps) => {
  const props = [
    { color: "bg-yellow-600", text: "bad" },
    { color: "bg-lime-600", text: "acceptable" },
    { color: "bg-green-600", text: "good" },
    { color: "bg-emerald-600", text: "very good" },
    { color: "bg-teal-600", text: "like new" },
    { color: "bg-cyan-600", text: "unused" },
  ];

  return (
    <Badge
      variant="outline"
      className={`${props[condition].color} text-primary-foreground px-1.5 text-xs font-medium`}
    >
      {props[condition].text}
    </Badge>
  );
};

type ItemNegotiableBadgeProps = {
  negotiable: boolean;
};

export const ItemNegotiableBadge = ({
  negotiable,
}: ItemNegotiableBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className="px-1.5 text-xs font-medium text-secondary-foreground"
    >
      {negotiable ? "negotiable" : "not negotiable"}
    </Badge>
  );
};

export const ItemBadgeSkeleton = () => {
  return <Skeleton className="h-5 w-20" />;
};
