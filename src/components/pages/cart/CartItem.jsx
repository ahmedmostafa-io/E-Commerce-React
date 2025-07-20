import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button";
import { useCart } from "../../context/Cart.context";
import Loading from "../Loading";
import { useContext } from "react";
import { DefaultContext } from "../../context/Default.context";
import Error from "../Error";

export default function CartItem({ products }) {
  const { removeCart, isLoading, updateCart, refreshCart } = useCart();
  const { error } = useContext(DefaultContext);
  const { count, product, price } = products;
  const { category, id, imageCover, title, brand } = product;
  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <>
      <div className="md:flex md:justify-between md:items-center space-y-2 py-5">
        <div className="flex gap-8 justify-between">
          <img src={imageCover} alt="" className="w-32 object-contain" />
          <div className=" lg:space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-main-light ">
                {brand.name}
              </h3>
              <h3 className="text-lg font-semibold line-clamp-1 font-encode">
                {" "}
                {title}{" "}
              </h3>

              <h3 className="text-md font-semibold font-encode">
                {category.name}
              </h3>
            </div>
            <h4 className="text-main text-lg font-semibold font-encode">
              Price : {price}EGP
            </h4>
            <Button
              className="bg-red-600 hover:bg-red-700 btn text-lg"
              onClick={() => removeCart(id)}
            >
              Remove Item
            </Button>
          </div>
        </div>
        <div className="flex gap-8 md:gap-5 items-center">
          <Button
            className="btn"
            onClick={() => {
              updateCart(id, count - 1);
              refreshCart();
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          {count}
          <Button
            className=" btn"
            onClick={() => {
              updateCart(id, count + 1);
              refreshCart();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
    </>
  );
}
