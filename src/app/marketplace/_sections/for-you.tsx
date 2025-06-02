"use client";

import ItemGallery from "@/components/item/item-gallery";
import { Section, SectionHeader } from "@/components/site-section";
import { useItems } from "@/hooks/api/marketplace";

const ForYouSection = () => {
  const { data, isLoading, error } = useItems({ q: "for" });

  return (
    <Section id="for-you">
      <SectionHeader
        title="For You"
        subtitle="Picked based on your recent search. Updated daily."
      />

      {/* GALLERY */}
      <ItemGallery
        data={data?.data.slice(0, 10)}
        isLoading={isLoading}
        error={error}
      />
    </Section>
  );
};

export default ForYouSection;
