import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/Token.context";
import { jwtDecode } from "jwt-decode";
import Loading from "./../Loading";
export default function Order() {
  const { token } = useContext(TokenContext);
  const { id } = jwtDecode(token);
  const [allOrders, setAllOrders] = useState(null);
  useEffect(() => {
    async function getUserOrders() {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
        );
        console.log(data);
        setAllOrders(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserOrders();
  }, []);

  return (
    <>
      <title>Order</title>
      {allOrders === null ? (
        <Loading />
      ) : (
        allOrders.map((order) => {
          return (
            <div
              key={order.id}
              className="mt-28 mb-8 border-2 border-gray-500/50 my-10 p-8 space-y-4"
            >
              <div className="flex justify-between items-center ">
                <div>
                  <h2>Order ID</h2>
                  <h4>#{order.id}</h4>
                </div>
                <div className="space-x-1">
                  <button className="btn bg-blue-700 hover:bg-blue-800">
                    Under delivery
                  </button>
                  <button
                    className={`btn ${
                      order.isPaid
                        ? "bg-main hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } `}
                  >
                    {order.isPaid ? "PAID" : "NOT PAID"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-5">
                {order.cartItems.map((item) => {
                  return (
                    <div key={item.product.id}>
                      <div className="border-2 border-gray-500/50 ">
                        <img src={item.product.imageCover} alt="" />
                        <div className="p-5">
                          <h2>{item.product.title}</h2>
                          <h2>{item.product.category.name}</h2>
                          <h5>{item.price}EGP</h5>
                          <h5>Product Count: {item.count}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <h2>Total Cart Price : {order.totalOrderPrice}</h2>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
