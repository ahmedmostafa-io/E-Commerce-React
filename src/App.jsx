import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectRoutes from "./components/ProtectRoutes";
import GuardRoute from "./components/GuardRoute";
import { Toaster } from "react-hot-toast";
import TokenProvider from "./components/context/Token.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DefaultFetchContext from "./components/context/Default.context";
import FavCartProvider from "./components/context/FavCart.context";
import CartProvider from "./components/context/Cart.context";
import Loading from "./components/pages/Loading";
// import Layout from "./layout/Layout";
// import Categories from "./components/pages/Category/Categories";
// import Order from "./components/pages/Main/Order";
// import ForgetPass from "./components/pages/ForgetPass";
//import CategoryProducts from "./components/pages/Category/CategoryProducts";
// import Error from "./components/pages/Error";
// import Cart from "./components/pages/cart/Cart";
// import Login from "./components/pages/Logging/Login";
// import Register from "./components/pages/Logging/Register";
// import Products from "./components/pages/Main/Products";
// import Brands from "./components/pages/Main/Brands";
// import Home from "./components/pages/Main/Home";
// import FavoriteItem from "./components/favorite/FavoriteItem";
// import ProductDetails from "./components/pages/ProductDetails/ProductDetails";
// import ResetPass from "./components/pages/ResetPass";
// import CheckOut from "./components/Paying/CheckOut";

const Layout = lazy(() => import("./layout/Layout"));
const Categories = lazy(() => import("./components/pages/Category/Categories"));
const Order = lazy(() => import("./components/pages/Main/Order"));
const ForgetPass = lazy(() => import("./components/pages/ForgetPass"));
const CategoryProducts = lazy(() =>
  import("./components/pages/Category/CategoryProducts")
);
const Error = lazy(() => import("./components/pages/Error"));
const Cart = lazy(() => import("./components/pages/cart/Cart"));
const Login = lazy(() => import("./components/pages/Logging/Login"));
const Register = lazy(() => import("./components/pages/Logging/Register"));
const Products = lazy(() => import("./components/pages/Main/Products"));
const Brands = lazy(() => import("./components/pages/Main/Brands"));
const Home = lazy(() => import("./components/pages/Main/Home"));
const FavoriteItem = lazy(() => import("./components/favorite/FavoriteItem"));
const ProductDetails = lazy(() =>
  import("./components/pages/ProductDetails/ProductDetails")
);
const ResetPass = lazy(() => import("./components/pages/ResetPass"));
const CheckOut = lazy(() => import("./components/Paying/CheckOut"));

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <GuardRoute>
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
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
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
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
                <Suspense fallback={<Loading />}>
                  <RouterProvider router={routes} />
                </Suspense>
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
