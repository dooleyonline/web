"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/ui/use-is-mobile";
import useNav from "@/hooks/ui/use-nav";
import slugToTitle from "@/lib/utils/slug-to-title";
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SiteHeader = () => {
  const [status, setStatus] = useState<"disabled" | "collapsed" | "expanded">(
    "disabled"
  );
  const isMobile = useIsMobile();
  const { paths, currentPage, isMainPage, pages } = useNav();
  const searchParams = useSearchParams();

  useEffect(() => {
    setStatus((prev) => {
      if (paths.includes("profile")) {
        return "disabled";
      } else if (isMainPage && searchParams.size === 0) {
        return "expanded";
      } else {
        if (prev === "expanded" && paths.includes("item")) {
          // case when on main page and item modal is open, do nothing
          return "expanded";
        } else {
          return "collapsed";
        }
      }
    });
  }, [isMainPage, paths, searchParams.size, status]);

  if (status === "disabled") return null;

  return (
    <motion.header
      animate={
        status === "expanded"
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
      className="border-b p-4 sm:p-6 rounded-b-4xl w-full relative"
    >
      <AnimatePresence>
        {status === "expanded" && (
          <motion.h1
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "0" }}
            className="font-display block overflow-hidden leading-relaxed"
          >
            {slugToTitle(currentPage)}
          </motion.h1>
        )}
      </AnimatePresence>

      <SearchBar
        status={status}
        mainPage={currentPage}
        pages={pages}
        searchParams={searchParams}
        searchPlaceholder="Search for anything ..."
      />
    </motion.header>
  );
};

type SiteSearchBarProps = {
  status: "disabled" | "collapsed" | "expanded";
  mainPage: string;
  searchPlaceholder: string;
  pages: string[];
  searchParams: URLSearchParams;
  className?: string;
};

const SearchBar = (props: SiteSearchBarProps) => {
  const {
    searchPlaceholder,
    status,
    mainPage,
    className,
    pages,
    searchParams,
  } = props;
  const router = useRouter();
  const isMobile = useIsMobile();

  const query = searchParams.get("q");
  const [input, setInput] = useState(
    pages.reduce((acc: Record<string, string>, page) => {
      acc[page] = "";
      return acc;
    }, {})
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${mainPage}?q=${encodeURIComponent(input[mainPage].trim())}`);
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (query) {
      setInput((prev) => ({ ...prev, [mainPage]: query }));
    }
  }, [query, mainPage, router]);

  return (
    <div className={`${className || ""} flex items-center w-full`}>
      <AnimatePresence>
        {status === "collapsed" && !isMobile && (
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
          disabled={input[mainPage].trim().length === 0}
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
