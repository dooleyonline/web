import type { Item } from "@/lib/api/marketplace/types";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

async function readItemsData(): Promise<Item[]> {
  const filePath = path.join(process.cwd(), "public/data/items.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  return JSON.parse(jsonData);
}

export async function GET() {
  try {
    const items = await readItemsData();
    const ids = items.map((item) => item.id);

    return NextResponse.json({ ids });
  } catch (error) {
    console.error("Error fetching item IDs:", error);
    return NextResponse.json({ ids: [] }, { status: 500 });
  }
}
