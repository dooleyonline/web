"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

type SiteHeaderProps = {
  isMainPage: boolean;
  title: string;
  onSearch: (query: string) => void;
  onBack: () => void;
  searchPlaceholder: string;
};

const SiteHeader = (props: SiteHeaderProps) => {
  const { isMainPage, title } = props;

  return (
    <motion.header
      animate={
        isMainPage
          ? {
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
            className="block overflow-hidden leading-normal"
          >
            {title}
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Surrounding with Suspense for this: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <SearchBar {...props} />
      </Suspense>
    </motion.header>
  );
};

type SiteSearchBarProps = SiteHeaderProps & {
  className?: string;
};

const SearchBar = (props: SiteSearchBarProps) => {
  const { onSearch, searchPlaceholder, isMainPage, onBack, className } = props;

  const isMobile = useIsMobile();
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) setInput(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

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
            <Button asChild onClick={onBack} variant="ghost" size="icon">
              <ChevronLeftIcon className="text-muted-foreground" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSubmit}
        id="search-bar"
        className="flex items-center gap-2 bg-sidebar rounded-full p-2 border flex-1"
      >
        <input
          id="search-input"
          type="text"
          placeholder={searchPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Search"
          className="w-full bg-transparent outline-hidden placeholder:text-muted-foreground ml-4"
        />
        <Button size="icon" type="submit" className="rounded-full flex-none">
          <ArrowRightIcon />
        </Button>
      </form>
    </div>
  );
};

SearchBar.displayName = "SearchBar"; // Good practice to add display name for forwardRef components

export default SiteHeader;
