"use client";

import { Error } from "@/components/communication";
import CategoryCard, {
  CategoryCardSkeleton,
} from "@/components/item/item-category";
import ItemGallery from "@/components/item/item-gallery";
import Section, { SectionHeader } from "@/components/site-section";
import { useItems } from "@/hooks/api/marketplace";
import useCategories from "@/hooks/api/marketplace/use-categories";
import { MarketplaceCategory } from "@/lib/api/marketplace";

const Home = () => {
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories({});
  const {
    data: forYouData,
    isLoading: isForYouLoading,
    error: forYouError,
  } = useItems({ q: "for" });
  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useItems({ q: "trending" });

  return (
    <>
      <Section id="categories">
        {categoriesError ? (
          <Error
            title={categoriesError.message}
            description="An error occurred while fetching categories."
          />
        ) : (
          <div className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
            {isCategoriesLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <CategoryCardSkeleton key={i} />
                ))
              : categoriesData?.map(
                  (item: MarketplaceCategory, i: number) => (
                    <CategoryCard key={i} {...item} />
                  )
                )}
          </div>
        )}
      </Section>

      <Section id="for-you">
        <SectionHeader
          title="For You"
          subtitle="Picked based on your recent search. Updated daily."
        />

        <ItemGallery
          data={forYouData?.slice(0, 10)}
          isLoading={isForYouLoading}
          error={forYouError}
        />
      </Section>

      <Section id="trending">
        <SectionHeader title="Trending" subtitle="Discover hot new items" />
        <ItemGallery
          data={trendingData}
          isLoading={isTrendingLoading}
          error={trendingError}
        />
      </Section>
    </>
  );
};

export default Home;
