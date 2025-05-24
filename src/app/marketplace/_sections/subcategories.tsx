import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Subcategory } from "@/types/subcategory";
import { promises as fs } from "fs";
import path from "path";

const SubcategoriesSection = async () => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "subcategories.json"
  );
  const fileContents = await fs.readFile(filePath, "utf-8");
  const subcategories: Subcategory[] = JSON.parse(fileContents);

  return (
    <Section
      id="for-you"
      title="For You"
      subtitle="Picked based on your recent search. Updated daily."
    >
      <div className="flex gap-2">
        <Button>All</Button>
        {subcategories.map((item: Subcategory, i: number) => (
          <Button key={i} variant="secondary">
            {item.name}
          </Button>
        ))}
      </div>
    </Section>
  );
};

export default SubcategoriesSection;
