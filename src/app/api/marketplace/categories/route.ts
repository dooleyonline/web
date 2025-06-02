import type {
  MarketplaceItemCategoriesResponse,
  MarketplaceItemCategory,
} from "@/lib/api/marketplace/types";
import { NextResponse } from "next/server";

import categoriesData from "./categories.json";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

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
