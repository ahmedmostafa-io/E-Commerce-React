import React, { useContext, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/Cart.context";
import Loading from "../Loading";
import Button from "../../Button";
import { Link } from "react-router";

export default function Cart() {
  const { cartInfo, isLoading, clearCart, refreshCart } =
    useContext(CartContext);
  useEffect(() => {
    refreshCart();
  }, [cartInfo]);
  if (isLoading || cartInfo === null) return <Loading />;

  const { products, totalCartPrice } = cartInfo.data;

  return (
    <>
      <div className="mt-28 mb-8 bg-slate-300 py-8 px-5">
        <h2 className="text-2xl font-semibold mb-2">
          Shop Cart <ShoppingCart className="inline-block" />
        </h2>
        {!totalCartPrice ? (
          <p className="text-red-500  text-2xl mb-5">Your Cart is Empty</p>
        ) : (
          <h3 className="font-encode text-2xl mb-5 text-main">
            Total:{totalCartPrice}EGP
          </h3>
        )}

        {products.map((product) => (
          <CartItem products={product} key={product.product.id} />
        ))}

        <div className="ms-auto w-fit mt-6">
          <Button
            className="bg-red-600 hover:bg-red-700 btn"
            onClick={async () => {
              await clearCart();
              refreshCart();
            }}
          >
            Clear Cart
          </Button>
        </div>
      </div>
      <Link to="/CheckOut" className="flex flex-row-reverse">
        <button className="btn mb-8">Buy Now</button>
      </Link>
    </>
  );
}
