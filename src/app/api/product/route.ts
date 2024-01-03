import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), "./product.json");
  // validate product data coming from file using Zod

  const product = {
    name: "Cool jeans",
    price: 100,
  };
  return NextResponse.json(product);
}
