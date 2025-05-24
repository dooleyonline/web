import DynamicIcon from "@/components/dynamic-icon";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { Subcategory } from "@/types/subcategory";

async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:3001/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return res.json();
}

async function getSubcategories(): Promise<Subcategory[]> {
  const res = await fetch("http://localhost:3001/subcategories");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Marketplace() {
  const [categories, subcategories] = await Promise.all([
    getCategories(),
    getSubcategories(),
  ]);

  return (
    <main>
      <Section id="categories" title="Categories">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
          {categories.map((item, i) => (
            <button
              key={i}
              className="flex h-20 sm:h-24 flex-col justify-between rounded-md bg-accent p-3 hover:opacity-75"
            >
              <DynamicIcon name={item.icon} className="h-6 w-6" />
              <span className="block text-left text-sm font-semibold leading-none">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section
        id="for-you"
        title="For You"
        subtitle="Picked based on your recent search. Updated daily."
      >
        <div className="flex gap-2">
          <Button>All</Button>
          {subcategories &&
            subcategories.map((item, i) => (
              <Button key={i} variant="secondary">
                {item.name}
              </Button>
            ))}
        </div>
      </Section>
    </main>
  );
}
