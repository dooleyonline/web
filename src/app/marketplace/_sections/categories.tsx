import DynamicIcon from "@/components/dynamic-icon";
import Section from "@/components/section";
import { Category } from "@/types/category";
import { promises as fs } from "fs";
import path from "path";

const CategoriesSection = async () => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "categories.json"
  );
  const fileContents = await fs.readFile(filePath, "utf-8");
  const categories: Category[] = JSON.parse(fileContents);

  return (
    <Section id="categories" title="Categories">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {categories.map((item: Category, i: number) => (
          <button
            key={i}
            className="flex h-20 flex-col justify-between rounded-md bg-accent p-3 hover:opacity-75 sm:h-24"
          >
            <DynamicIcon name={item.icon} className="h-6 w-6" />
            <span className="block text-left text-sm font-semibold leading-none">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </Section>
  );
};

export default CategoriesSection;
