import {
  ItemConditionBadge,
  ItemNegotiableBadge,
} from "@/components/item/item-badge";
import ItemCarousel from "@/components/item/item-carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { itemsApi } from "@/lib/api/marketplace";
import formatPrice from "@/lib/utils/format-price";
import getRelativeTime from "@/lib/utils/get-relative-time";
import { HeartIcon } from "lucide-react";

const MarketplaceItem = async ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = await params;
  const data = await itemsApi.get({ id: itemId });
  const item = data.data[0];

  const relativeTime = getRelativeTime(item.postedAt);

  return (
    <main className="w-full h-full lg:h-fit">
      <div className="h-full overflow-auto flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <ItemCarousel item={item} />
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="text-left p-0 grow mb-2">
            <h2 className="text-2xl font-medium">{item.name}</h2>
            <div className="flex gap-1 my-2!">
              <ItemConditionBadge condition={item.condition} />
              <ItemNegotiableBadge negotiable={item.isNegotiable} />
            </div>
            <span className="block my-3! text-xl font-semibold">
              {formatPrice(item.price)}
            </span>

            <p className="text-secondary-foreground text-base">
              {item.description}
            </p>
          </div>

          <div className="flex gap-2 items-center mb-3">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className="mr-2 inline-block">{item.seller}</span>
              <small className="text-muted-foreground">
                {relativeTime} · {item.views} views
              </small>
            </div>
          </div>

          <div className="p-0 flex gap-2 grow-0 justify-start! space-x-0! w-full bg-background">
            <Button variant="default" size="lg" className="flex-1">
              Contact Seller
            </Button>

            <Button size="lg" variant="outline" className="shrink-0">
              <HeartIcon />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export async function generateStaticParams() {
  const data = await itemsApi.getAllIds();
  const ids = data?.ids;

  if (!ids || ids.length === 0) {
    return [];
  }

  return ids.map((id) => ({
    id: String(id),
  }));
}

export default MarketplaceItem;
