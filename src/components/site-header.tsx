"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronLeftIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  isMainPage: boolean;
  onSearch: (query: string) => void;
  onBack: () => void;
  searchPlaceholder: string;
};

const SiteHeader = ({
  isMainPage,
  onSearch,
  onBack,
  searchPlaceholder,
}: SiteHeaderProps) => {
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
      className="border-b px-4 sm:px-6 py-6 rounded-b-4xl w-full"
    >
      <AnimatePresence>
        {isMainPage && (
          <motion.h1
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "0" }}
            className="block overflow-hidden leading-normal"
          >
            Marketplace
          </motion.h1>
        )}
      </AnimatePresence>

      <div className="flex items-center">
        <AnimatePresence>
          {!isMainPage && (
            <motion.div
              key="modal"
              animate={{ width: "auto", marginRight: "8px" }}
              exit={{ width: "0px", marginRight: "0px" }}
            >
              <Button asChild onClick={onBack} variant="ghost" size="icon">
                <ChevronLeftIcon className="text-muted-foreground" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <SearchBar onSearch={onSearch} searchPlaceholder={searchPlaceholder} />
      </div>
    </motion.header>
  );
};

type SiteSearchBarProps = Pick<
  SiteHeaderProps,
  "onSearch" | "searchPlaceholder"
>;

const SearchBar = ({ onSearch, searchPlaceholder }: SiteSearchBarProps) => {
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
    <form
      onSubmit={handleSubmit}
      id="search-bar"
      className="flex items-center gap-2 w-full bg-sidebar rounded-full p-2 border border-sidebar-border"
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
  );
};

export default SiteHeader;
