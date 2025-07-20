import React, { useContext } from "react";
import { HeartOff, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FavContext } from "../context/FavCart.context";
import { CartContext } from "../context/Cart.context";
import Loading from "../pages/Loading";

export default function FavoritesAnimated() {
  const { favList, isFavLoading, removeFromFav } = useContext(FavContext);
  const { addToCart } = useContext(CartContext);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 },
    },
  };

  if (isFavLoading) {
    return <Loading />;
  }

  const products = favList?.data || [];

  return (
    <div className="mt-28 px-5 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-main">
        Your Favorite Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No favorite products yet.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                layout
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-main font-bold text-xl">
                    {product.price} EGP
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        removeFromFav(product.id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded-lg flex items-center justify-center text-sm cursor-pointer"
                    >
                      <HeartOff className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product.id);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 px-2 rounded-lg flex items-center justify-center cursor-pointer text-sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
