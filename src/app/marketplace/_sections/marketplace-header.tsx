"use client";

import useDataFetching from "@/hooks/useDataFetching";
import { getSubcategories } from "@/lib/subcategory-service";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const MarketplaceHeaderSection = () => {
  const [current, setCurrent] = useState<number>(0);

  const {
    data: subcategories,
    isLoading: isSubcategoriesLoading,
    error: subcategoriesError,
  } = useDataFetching(getSubcategories);

  useEffect(() => {
    if (subcategories && subcategories.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % subcategories.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSubcategoriesLoading, subcategories, subcategoriesError]);

  if (subcategoriesError) {
    console.error("Error fetching subcategories:", subcategoriesError);
    return;
  }

  if (isSubcategoriesLoading) {
    return;
  }

  return (
    <h1 className="mb-4 overflow-hidden">
      Looking for{" "}
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="relative inline-block"
        >
          {subcategories && subcategories[current]?.name}?
        </motion.span>
      </AnimatePresence>
    </h1>
  );
};

export default MarketplaceHeaderSection;
