import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

type ItemConditionBadgeProps = {
  condition: number | undefined;
  isLoading?: boolean;
};

export const ItemConditionBadge = (props: ItemConditionBadgeProps) => {
  const { condition, isLoading = false } = props;
  const conditions = [
    { color: "bg-yellow-600", text: "poor" },
    { color: "bg-lime-600", text: "fair" },
    { color: "bg-green-600", text: "good" },
    { color: "bg-emerald-600", text: "very good" },
    { color: "bg-teal-600", text: "like new" },
    { color: "bg-cyan-600", text: "new" },
  ];

  if (condition === undefined || isLoading) {
    return <ItemBadgeSkeleton />;
  }

  return (
    <Badge
      variant="outline"
      className={`${conditions[condition].color} text-primary-foreground px-1.5 text-xs font-medium`}
    >
      {conditions[condition].text}
    </Badge>
  );
};

type ItemNegotiableBadgeProps = {
  negotiable: boolean | undefined;
  isLoading?: boolean;
};

export const ItemNegotiableBadge = (props: ItemNegotiableBadgeProps) => {
  const { negotiable, isLoading = false } = props;

  if (negotiable === undefined || isLoading) {
    return <ItemBadgeSkeleton />;
  }

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
