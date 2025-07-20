import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Categories from "./components/pages/Category/Categories";
import Order from "./components/pages/Main/Order";
import { Toaster } from "react-hot-toast";
import ForgetPass from "./components/pages/ForgetPass";
import CategoryProducts from "./components/pages/Category/CategoryProducts";
import Error from "./components/pages/Error";
import ProtectRoutes from "./components/ProtectRoutes";
import GuardRoute from "./components/GuardRoute";
import TokenProvider from "./components/context/Token.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import DefaultFetchContext from "./components/context/Default.context";
import Cart from "./components/pages/cart/Cart";
import CartProvider from "./components/context/Cart.context";
import FavCartProvider from "./components/context/FavCart.context";
import Login from "./components/pages/Logging/Login";
import Register from "./components/pages/Logging/Register";
import Products from "./components/pages/Main/Products";
import Brands from "./components/pages/Main/Brands";
import Home from "./components/pages/Main/Home";
import FavoriteItem from "./components/favorite/FavoriteItem";
import ProductDetails from "./components/pages/ProductDetails/ProductDetails";
import ResetPass from "./components/pages/ResetPass";
import CheckOut from "./components/Paying/CheckOut";
const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <GuardRoute>
        <Layout />
      </GuardRoute>
    ),
    children: [
      { path: "Login", element: <Login /> },
      { index: 0, path: "", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "forgetPass", element: <ForgetPass /> },
      { path: "ResetPass", element: <ResetPass /> },
    ],
  },
  {
    path: "",
    element: (
      <ProtectRoutes>
        <Layout />
      </ProtectRoutes>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      { path: "/category/:categoryId", element: <CategoryProducts /> },
      { path: "Products", element: <Products /> },
      { path: "Product/:id", element: <ProductDetails /> },
      { path: "Categories", element: <Categories /> },
      { path: "Brands", element: <Brands /> },
      { path: "allorders", element: <Order /> },
      { path: "Order", element: <Order /> },
      { path: "Cart", element: <Cart /> },
      { path: "Fav", element: <FavoriteItem /> },
      { path: "CheckOut", element: <CheckOut /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

const query = new QueryClient();
export default function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <TokenProvider>
          <DefaultFetchContext>
            <FavCartProvider>
              <CartProvider>
                <RouterProvider router={routes} />
                <Toaster />
                <ReactQueryDevtools />
              </CartProvider>
            </FavCartProvider>
          </DefaultFetchContext>
        </TokenProvider>
      </QueryClientProvider>
    </>
  );
}
