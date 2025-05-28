import { ArrowRightIcon } from "lucide-react";

import { Button } from "./ui/button";

const SiteSearchBar = () => {
  return (
    <div className="flex items-center gap-2 w-full bg-sidebar rounded-full p-2 mb-4 border border-sidebar-border">
      <input
        type="text"
        placeholder="Search for anything..."
        className="w-full bg-transparent outline-hidden placeholder:text-muted-foreground ml-4"
        aria-label="Search"
      />
      <Button size="icon" className="rounded-full flex-none">
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default SiteSearchBar;
