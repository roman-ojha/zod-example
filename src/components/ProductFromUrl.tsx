"use client";

import { useSearchParams } from "next/navigation";
import { z } from "zod";

const searchParamsSchema = z.object({
  id: z.coerce.number(), // convert id into a number
  color: z.enum(["red", "green", "blue"]), // it can only be provided value
});

const ProductFromUrl = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);

  const validatedSearchParams =
    searchParamsSchema.safeParse(searchParamsObject);

  if (!validatedSearchParams.success) {
    return <></>;
  }

  console.log(validatedSearchParams.data.id.toFixed());

  return <></>;
};

export default ProductFromUrl;
