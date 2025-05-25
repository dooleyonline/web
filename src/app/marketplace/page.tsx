"use client";

import SearchBar from "@/components/search-bar";
import { getSubcategories } from "@/lib/subcategory-service";
import { Subcategory } from "@/types/subcategory";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import CategoriesSection from "./_sections/categories";
import ForYouSection from "./_sections/for-you";

export default function Marketplace() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubcategoriesData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSubcategories();
        setSubcategories(data);
      } catch (e) {
        console.error(
          "Error fetching subcategories in SubcategoriesSection:",
          e
        );
        setError(
          e instanceof Error ? e.message : "Failed to load subcategories."
        );
      }
      setIsLoading(false);
    };

    fetchSubcategoriesData();
  }, []);

  useEffect(() => {
    if (subcategories.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % subcategories.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [subcategories]);

  return (
    <main>
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
            {subcategories[current]?.name}?
          </motion.span>
        </AnimatePresence>
      </h1>

      <SearchBar />
      <CategoriesSection />
      <ForYouSection />
    </main>
  );
}
