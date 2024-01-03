"use client";
import { useEffect } from "react";
import { z } from "zod";

const Product = () => {
  // Creating Schema of a data to validate
  const productSchema = z.object({
    name: z.string(),
    price: z.number().positive(),
  });

  // If you need a typescript type create infer it from zod
  type Product = z.infer<typeof productSchema>;

  useEffect(() => {}, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetch("/api/product")
      .then((res) => res.json())
      .then((product) => {
        // if we will change the shape of the response api schema and we have use the old schema to access the data in that case our application could get crash and that would not be the best UX
        // we can use optional chaining '?' to not throw error while getting data
        console.log(product?.name?.toUpperCase());
        // but that does not work if our data is of different type EX:
        console.log(product?.price?.toFixed(2)); // 'toFixed' only exist on a number
      }),

    // Using Zod to validate the product

    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetch("/api/product")
      .then((res) => res.json())
      .then((product: unknown) => {
        // firstly product type would going be unknown, because we still don't know the type of product
        // now we will validate the incoming product data using 'productSchema'
        // https://zod.dev/?id=basic-usage
        // const validateProduct = productSchema.parse(product); // throw an error
        const validateProduct = productSchema.safeParse(product); // { success: true; data: {} }
        if (!validateProduct.success) {
          console.error(validateProduct.error);
          return;
        }

        // use product on you application
        console.log(validateProduct.data);
      }),
    // NOTE: that we can achieve the same from tRPC as well
  ]);
  return <div></div>;
};

export default Product;
