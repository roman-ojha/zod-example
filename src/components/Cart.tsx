"use client";

import { z } from "zod";

const Cart = () => {
  // we could have store cart information into local storage
  // getting cart information

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const cartSchema = z.array(
    z.object({
      id: z.number(),
      quantity: z.number().int().positive(),
    })
  );

  // validating Cart Schema
  const validatedCart = cartSchema.safeParse(cart);

  if (!validatedCart.success) {
    localStorage.removeItem("cart");
    return;
  }

  validatedCart.data.map((item) => console.log(item));
  return <div>Cart</div>;
};

export default Cart;
