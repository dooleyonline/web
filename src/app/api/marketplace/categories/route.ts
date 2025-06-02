import type {
  MarketplaceItemCategoriesResponse,
  MarketplaceItemCategory,
} from "@/lib/api/marketplace/types";
import { NextResponse } from "next/server";

import categoriesData from "./categories.json";

export async function GET() {
  try {
    const categories = categoriesData as MarketplaceItemCategory[];
    const totalCount = categories.length;

    return NextResponse.json({
      data: categories,
      count: totalCount,
    } satisfies MarketplaceItemCategoriesResponse);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
