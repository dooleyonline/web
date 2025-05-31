"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import useNav from "@/hooks/use-nav";
import { slugToTitle } from "@/lib/utils";
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const SiteHeader = () => {
  const isMobile = useIsMobile();

  const { pathname, mainPage, isMainPage, pages } = useNav();
  const isVisible = isMainPage || pathname.includes("search");

  if (!isVisible) return;

  return (
    <motion.header
      animate={
        isMainPage
          ? isMobile
            ? {
                paddingTop: "60px",
                borderBottomWidth: "1px",
              }
            : {
                paddingTop: "180px",
                borderBottomWidth: "1px",
              }
          : {
              paddingTop: "24px",
              borderBottomWidth: "0px",
            }
      }
      transition={{ ease: "anticipate" }}
      className="border-b px-4 sm:px-6 py-6 rounded-b-4xl w-full relative"
    >
      <AnimatePresence>
        {isMainPage && (
          <motion.h1
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "0" }}
            className="font-display block overflow-hidden leading-relaxed"
          >
            {slugToTitle(mainPage)}
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Surrounding with Suspense for this: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <SearchBar
          isMainPage={isMainPage}
          mainPage={mainPage}
          pages={pages}
          searchPlaceholder="Search for anything ..."
        />
      </Suspense>
    </motion.header>
  );
};

type SiteSearchBarProps = {
  isMainPage: boolean;
  mainPage: string;
  searchPlaceholder: string;
  pages: string[];
  className?: string;
};

const SearchBar = (props: SiteSearchBarProps) => {
  const { searchPlaceholder, isMainPage, mainPage, className, pages } = props;
  const router = useRouter();
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [input, setInput] = useState(
    pages.reduce((acc: Record<string, string>, page) => {
      acc[page] = "";
      return acc;
    }, {})
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${mainPage}/search?q=${encodeURIComponent(input[mainPage])}`);
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (query) {
      setInput((prev) => ({ ...prev, [mainPage]: query }));
    } else {
      // return to main page if no query
      router.push(`/${mainPage}`);
    }
  }, [query, mainPage, router]);

  return (
    <div className={`${className || ""} flex items-center w-full`}>
      <AnimatePresence>
        {!isMainPage && !isMobile && (
          <motion.div
            key="modal"
            initial={{ width: "0px", marginRight: "0px" }}
            animate={{ width: "auto", marginRight: "8px" }}
            exit={{ width: "0px", marginRight: "0px" }}
            className="overflow-hidden"
          >
            <Button asChild onClick={handleBack} variant="ghost" size="icon">
              <ChevronLeftIcon className="text-muted-foreground" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSearch}
        id="search-bar"
        className="flex items-center gap-2 bg-sidebar rounded-full p-2 border flex-1"
      >
        <input
          id="search-input"
          type="text"
          placeholder={searchPlaceholder}
          value={input[mainPage]}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, [mainPage]: e.target.value }))
          }
          aria-label="Search"
          className="w-full bg-transparent outline-hidden placeholder:text-muted-foreground ml-4"
        />
        <Button
          variant="outline"
          size="icon"
          type="submit"
          disabled={input[mainPage].length === 0 || mainPage !== "marketplace"} // temporary disable for non-marketplace pages
          className="rounded-full flex-none"
        >
          <ArrowRightIcon />
        </Button>
      </form>
    </div>
  );
};

SearchBar.displayName = "SearchBar"; // Good practice to add display name for forwardRef components

export default SiteHeader;
