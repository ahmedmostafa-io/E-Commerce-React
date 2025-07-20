import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useCart } from "../context/Cart.context";
import { TokenContext } from "../context/Token.context";
import { useNavigate } from "react-router";

export default function CheckOut() {
  const { cartInfo } = useCart();
  const { token } = useContext(TokenContext);
  const [isCash, setIsCash] = useState(true);
  const navigate = useNavigate();
  async function createOnlineOrder(values) {
    let test = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173/`,
      { data: test },
      { headers: { token } }
    );
    if (data.status === "success") {
      window.location.replace(data.session.url);
      console.log(test);
    }
  }

  async function createCashOrder(values) {
    let test = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
      { data: test },
      { headers: { token } }
    );
    setTimeout(() => navigate("/allorders"), 1500);

    console.log(data);
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      if (isCash) {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },
  });
  return (
    <>
      <div className="mt-24 mb-8">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="city">city:</label>
            <input
              type="text"
              id="city"
              placeholder="Enter Your City"
              className="input bg-gray-100 w-full"
              onChange={formik.handleChange}
              name="city"
            />
          </div>
          <div>
            <label htmlFor="phone">phone:</label>
            <input
              placeholder="Your Phone Number"
              type="text"
              id="phone"
              className="input bg-gray-100 w-full"
              onChange={formik.handleChange}
              name="phone"
            />
          </div>
          <div>
            <label htmlFor="details">details:</label>
            <input
              placeholder="Details"
              type="text"
              id="details"
              className="input bg-gray-100 w-full"
              onChange={formik.handleChange}
              name="details"
            />
          </div>
          <div className="space-x-2.5">
            <button
              type="submit"
              onClick={() => setIsCash(true)}
              className="btn hover:bg-green-600"
            >
              Create Cash Order
            </button>
            <button
              type="submit"
              onClick={() => setIsCash(false)}
              className="btn bg-blue-600 hover:bg-blue-700"
            >
              Create Online Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
