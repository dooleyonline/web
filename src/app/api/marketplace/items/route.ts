import type {
  MarketplaceItem,
  MarketplaceItemsResponse,
} from "@/lib/api/marketplace/types";
import { NextRequest, NextResponse } from "next/server";

import itemsData from "./items.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    if (!q && !id && !category && !subcategory) {
      return NextResponse.json({
        data: [],
        count: 0,
      } satisfies MarketplaceItemsResponse);
    }

    const items = itemsData as MarketplaceItem[];

    // Apply filters
    let filteredItems = [...items];

    if (q) {
      const searchLower = q.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    if (id) {
      const idNumber = parseInt(id, 10);
      if (!isNaN(idNumber)) {
        filteredItems = filteredItems.filter((item) => item.id === idNumber);
      } else {
        return NextResponse.json(
          { error: "Invalid ID format" },
          { status: 400 }
        );
      }
    }

    if (category) {
      filteredItems = filteredItems.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (subcategory) {
      filteredItems = filteredItems.filter(
        (item) => item.subcategory.toLowerCase() === subcategory.toLowerCase()
      );
    }

    // Apply sorting
    // if (sortBy) {
    //   const [field, direction] = sortBy.split(":");
    //   const isDesc = direction === "desc";

    //   filteredItems.sort((a, b) => {
    //     if (a[field] < b[field]) return isDesc ? 1 : -1;
    //     if (a[field] > b[field]) return isDesc ? -1 : 1;
    //     return 0;
    //   });
    // } else {
    //   // Default sort by most recent
    //   filteredItems.sort(
    //     (a, b) =>
    //       new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    //   );
    // }

    // Calculate pagination
    const totalCount = filteredItems.length;
    // const totalPages = Math.ceil(totalCount / pageSize);
    // const startIndex = (page - 1) * pageSize;
    // const endIndex = startIndex + pageSize;
    // const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // Format response like a Django REST Framework response
    return NextResponse.json({
      data: filteredItems,
      count: totalCount,
      // next:
      //   page < totalPages
      //     ? `/api/marketplace/items?page=${page + 1}${searchParams.toString() ? "&" + searchParams.toString() : ""}`
      //     : null,
      // previous:
      //   page > 1
      //     ? `/api/marketplace/items?page=${page - 1}${searchParams.toString() ? "&" + searchParams.toString() : ""}`
      //     : null,
    } satisfies MarketplaceItemsResponse);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
