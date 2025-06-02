"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/ui";
import { useNav } from "@/hooks/ui";
import slugToTitle from "@/lib/utils/slug-to-title";
import { ArrowRightIcon, ChevronLeftIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

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
                paddingBottom: "24px",
                borderBottomWidth: "1px",
              }
            : {
                paddingTop: "180px",
                paddingBottom: "24px",
                borderBottomWidth: "1px",
              }
          : {
              paddingTop: "16px",
              paddingBottom: "0px",
              borderBottomWidth: "0px",
            }
      }
      transition={{ ease: "anticipate" }}
      className="border-b px-4 sm:px-6 rounded-b-4xl w-full relative"
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

function parseInput(input: string) {
  let q = input.trim();
  const category = q.match(/#\w+/g)?.[0];
  if (category) {
    q = q.replace(category, "").trim();
  }

  const qURI = q.length > 0 ? `q=${encodeURIComponent(q)}` : "";
  const categoryURI = category
    ? `&category=${encodeURIComponent(category.replace("#", ""))}`
    : "";

  return { qURI, categoryURI };
}

const SearchBar = memo((props: SiteSearchBarProps) => {
  const {
    searchPlaceholder,
    status,
    mainPage,
    className,
    pages,
    searchParams,
  } = props;
  const router = useRouter();

  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const [input, setInput] = useState(
    pages.reduce((acc: Record<string, string>, page) => {
      acc[page] = "";
      return acc;
    }, {})
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { qURI, categoryURI } = parseInput(input[mainPage]);
    router.push(`/${mainPage}?${qURI}${categoryURI}`);
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (q) {
      setInput((prev) => ({ ...prev, [mainPage]: `${q}` }));
    }
  }, [mainPage, q, category]);

  return (
    <div className={`${className || ""} flex items-center w-full`}>
      <AnimatePresence>
        {status === "collapsed" && (
          <motion.div
            key="modal"
            initial={{ width: "0px", marginRight: "0px" }}
            animate={{ width: "auto", marginRight: "8px" }}
            exit={{ width: "0px", marginRight: "0px" }}
            className="overflow-hidden"
          >
            <Button asChild onClick={handleBack} variant="ghost" size="icon">
              <ChevronLeftIcon className="text-muted-foreground !size-8 sm:!size-9" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSearch}
        id="search-bar"
        className="flex items-center gap-2 bg-sidebar rounded-full p-1 sm:p-2 border flex-1 !pl-4 sm:!pl-5"
      >
        {category && (
          <div className="flex gap-1 p-1 items-center rounded-sm border bg-secondary font-medium text-sm text-secondary-foreground">
            <button
              onClick={(e) => {
                e.preventDefault();
                const { qURI } = parseInput(input[mainPage]);
                router.push(`/${mainPage}?${qURI}`);
              }}
            >
              <XIcon size={16} className="text-muted-foreground" />
            </button>
            {category}
          </div>
        )}
        <input
          id="search-input"
          type="text"
          placeholder={searchPlaceholder}
          value={input[mainPage]}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, [mainPage]: e.target.value }))
          }
          aria-label="Search"
          className="w-full bg-transparent outline-hidden placeholder:text-muted-foreground"
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
});
SearchBar.displayName = "SearchBar";

export default SiteHeader;
