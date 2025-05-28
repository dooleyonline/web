"use client";

import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

interface SiteSearchBarProps {
  onSearch: (query: string) => void;
}

const SiteSearchBar = ({ onSearch }: SiteSearchBarProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full bg-sidebar rounded-full p-2 mb-4 border border-sidebar-border"
    >
      <input
        type="text"
        placeholder="Search for anything..."
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

export default SiteSearchBar;
