"use client";

import ItemGallery from "@/components/item/item-gallery";
import { useItems } from "@/hooks/api/marketplace";
import { MarketplaceItemQueryParams } from "@/lib/api/marketplace";

type SearchProps = {
  queryParams: MarketplaceItemQueryParams;
};

const Search = (props: SearchProps) => {
  const { queryParams } = props;
  const { data, isLoading, error } = useItems(queryParams);

  return <ItemGallery data={data} isLoading={isLoading} error={error} />;
};

export default Search;
