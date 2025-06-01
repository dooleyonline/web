import type { Item } from "@/lib/api/marketplace/types";
import { NextResponse } from "next/server";

import itemsData from "../items.json";

export async function GET() {
  try {
    const items = itemsData as Item[];
    const ids = items.map((item) => item.id);
    console.log(ids);
    return NextResponse.json({ ids });
  } catch (error) {
    console.error("Error fetching item IDs:", error);
    return NextResponse.json({ ids: [] }, { status: 500 });
  }
}
