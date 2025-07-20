import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Heart, Search, Eye } from "lucide-react";
import Loading from "../Loading";
import Error from "../Error";

import { DefaultContext } from "./../../context/Default.context";
import { CartContext } from "./../../context/Cart.context";
import { FavContext } from "./../../context/FavCart.context";
import { Link } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const { error, setError } = useContext(DefaultContext);
  const { addToCart } = useContext(CartContext);
  const { addToFav, refetchFavList } = useContext(FavContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = response.data.data;
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (searchQuery) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      updated = updated.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      updated = updated.filter((p) => p.price <= Number(maxPrice));
    }

    switch (sortOption) {
      case "price-asc":
        updated.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        updated.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        updated.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        updated.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(updated);
  }, [searchQuery, minPrice, maxPrice, sortOption, products]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Products</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {/* Search */}
          <div className="relative col-span-2 md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Min Price */}
          <input
            type="number"
            placeholder="Min Price"
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          {/* Sort */}
          <select
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A → Z</option>
            <option value="title-desc">Title: Z → A</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const hasDiscount =
                product.originalPrice && product.originalPrice > product.price;
              const discountPercent = hasDiscount
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )
                : 0;

              return (
                <div
                  key={product._id}
                  className="bg-white border border-gray-100 rounded-3xl shadow-md overflow-hidden group relative transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image + Overlay Icons */}
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Discount Badge */}
                    {hasDiscount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        -{discountPercent}%
                      </span>
                    )}

                    {/* Hover Overlay Icons */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
                      <Link
                        to={`/product/${product.id}`}
                        className="p-2 bg-main cursor-pointer hover:bg-white rounded-full shadow text-white hover:text-main transition duration-500"
                      >
                        <Eye className="w-5 h-5   " />
                      </Link>
                      <button
                        onClick={async () => {
                          await addToFav(product.id);
                          refetchFavList();
                        }}
                        className="p-2 bg-main cursor-pointer hover:bg-white rounded-full shadow text-white hover:text-main transition duration-500"
                      >
                        <Heart className="w-5 h-5   " />
                      </button>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="p-2 bg-main cursor-pointer hover:bg-white rounded-full shadow text-white hover:text-main transition duration-500"
                      >
                        <ShoppingCart className="w-5 h-5   " />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {product.category?.name}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-400 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.round(product.ratingsAverage) ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="text-gray-400 ml-2">
                        ({product.ratingsQuantity})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col mt-2">
                      <span className="text-green-600 font-bold text-sm">
                        {product.price} EGP
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice} EGP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 font-medium col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
