import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { FavContext } from "./../../context/FavCart.context";
import { CartContext } from "./../../context/Cart.context";
import { DefaultContext } from "./../../context/Default.context";
import Loading from "./../Loading";
import Error from "../Error";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const { error, setError, isLoading, setIsLoading } =
    useContext(DefaultContext);
  const { addToCart } = useContext(CartContext);
  const { addToFav, refetchFavList } = useContext(FavContext);
  useEffect(() => {
    async function getProductsByCategory() {
      try {
        setError(null);
        setIsLoading(true);

        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
        );

        if (data.data.length === 0) {
          setError("Sorry, there are no products in this category.");
          setProducts([]);
        } else {
          setProducts(data.data);
        }
      } catch (err) {
        if (!err.response) {
          setError(
            "⚠ No internet connection. Please check your network and try again."
          );
        } else {
          setError(
            "An error occurred while fetching products. Please try again later."
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    getProductsByCategory();
  }, [categoryId]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-4 pt-24">
      {products.map((product) => (
        <div
          key={product._id}
          className="card shadow-2xl rounded-lg bg-white group/card"
        >
          <title>{product.category.name}</title>
          <div className="relative overflow-hidden">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-60 object-contain"
            />
            <div className="layer bg-gray-500/40 absolute inset-1 gap-1 flex justify-center items-center opacity-0 group-hover/card:opacity-100 transition duration-500">
              <Link to={`/product/${product._id}`}>
                <Eye className="bg-main text-white h-8 w-8 rounded-full hover:text-main hover:bg-white cursor-pointer p-1 transition duration-500" />
              </Link>
              <ShoppingCart
                onClick={() => addToCart(product._id)}
                className="bg-main text-white h-8 w-8 rounded-full hover:text-main hover:bg-white cursor-pointer p-1 transition duration-500"
              />
              <Heart
                onClick={async () => {
                  await addToFav(product.id);
                  refetchFavList();
                }}
                className="bg-main text-white h-8 w-8 rounded-full hover:text-main hover:bg-white cursor-pointer p-1 transition duration-500"
              />
            </div>
          </div>
          <div className="card-body p-4">
            <h2 className="text-xl line-clamp-1 font-semibold">
              {product.title}
            </h2>
            <h3 className="text-lg font-semibold text-main">
              {product.category.name}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-500">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <h3>{product.price} EGP</h3>
              <h3>⭐{product.ratingsAverage}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
