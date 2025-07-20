import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { DefaultContext } from "./../../context/Default.context";
import Loading from "./../Loading";
import Error from "../Error";
import MainSlider from "../MainSlider";
import CategorySlider from "./../Category/CategorySlider";
import Card from "./../cart/Card";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const { isLoading, error, setError, setIsLoading } =
    useContext(DefaultContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setAllProducts(data.data);
        setProducts(data.data);
      } catch (err) {
        if (err.response) {
          const message = err.response.data?.message || "Server error";
          setError(message);
          toast.error(message);
        } else if (err.request) {
          setError("No internet connection");
          toast.error("No internet connection");
        } else {
          setError("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [searchQuery, allProducts]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="pt-14">
      <title>Home Page</title>
      <MainSlider />
      <CategorySlider />
      <div className="relative ">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 py-12 gap-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
