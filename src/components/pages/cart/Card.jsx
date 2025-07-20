// import playStation from "../../assets/images/playstation.jpeg";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { FavContext } from "../../context/FavCart.context";
import { Link } from "react-router";

export default function Card({ product }) {
  const {
    imageCover,
    description,
    price,
    title,
    ratingsAverage,
    category,
    id,
  } = product;
  const { addToCart } = useContext(CartContext);
  const { addToFav, refetchFavList } = useContext(FavContext);
  return (
    <div className="card shadow-2xl rounded-lg bg-white group/card">
      <div className="relative overflow-hidden  ">
        <img src={imageCover} alt="" className="w-full" />
        <div className="layer bg-gray-500/40 absolute inset-1 gap-1 flex justify-center items-center opacity-0 group-hover/card:opacity-100 transition duration-500">
          <Link to={`/product/${id}`}>
            <Eye className="bg-main text-white h-8 w-8 rounded-full hover:text-main hover:bg-white cursor-pointer p-1 transition duration-500" />
          </Link>
          <ShoppingCart
            onClick={async () => {
              await addToCart(id);
            }}
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
        <h2 className="text-xl line-clamp-1 font-semibold">{title}</h2>
        <h3 className="text-lg font-semibold text-main">{category.name}</h3>
        <p className="line-clamp-2 text-sm text-gray-500">{description}</p>
        <div className="flex justify-between items-center">
          <h3>{price}EGP</h3>
          <h3>⭐{ratingsAverage}</h3>
        </div>
      </div>
    </div>
  );
}
