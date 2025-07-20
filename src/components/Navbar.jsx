import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import mainLogo from "../assets/images/freshcart-logo.svg";
import { AlignJustify, LogOut, X } from "lucide-react";
import {
  faCartShopping,
  faHeart,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "./context/Token.context";
import { CartContext } from "./context/Cart.context";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const sign2 = ["Register", "Login"];
  function handleToggle() {
    setToggle((e) => !e);
  }
  const { token, setToken } = useContext(TokenContext);
  const { cartInfo, isLoading } = useContext(CartContext);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return (
    <>
      <nav
        className={`bg-slate-300 py-5 fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container flex justify-between items-center">
          <img src={mainLogo} alt="" />
          <MainList className=" hidden lg:flex gap-3" token={token} />
          <LogoList
            className="hidden lg:flex gap-3 lg:items-center"
            token={token}
            cartInfo={cartInfo}
            isLoading={isLoading}
            setToken={setToken}
          />
          <ul className="flex justify-center items-center gap-5 lg:hidden">
            {!token
              ? sign2.map((item) => (
                  <li key={item}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-lg lg:block duration-300 hover:text-green-600  hover:scale-105 transition-color transition-color text-green-600 underline hover:underline transition-color"
                          : "text-lg lg:block duration-300 hover:text-green-600  hover:scale-105 transition-color hover:underline  transition-color"
                      }
                      to={item}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))
              : null}
          </ul>
          {toggle ? (
            <X className="lg:hidden cursor-pointer " onClick={handleToggle} />
          ) : (
            <AlignJustify
              className="lg:hidden cursor-pointer "
              onClick={handleToggle}
            />
          )}
        </div>
      </nav>

      <div
        className={
          toggle
            ? "bg-slate-400/40 flex flex-col lg:hidden justify-between transition-all duration-1000 items-center  h-[100vh] w-[50vw] *:p-5 fixed top-0 right-0 z-40"
            : "w-0 overflow-hidden h-0"
        }
      >
        <MainList className=" flex-col mt-16 gap-3 space-y-7" token={token} />
        <LogoList
          className="flex gap-3 cursor-pointer items-center  "
          token={token}
          cartInfo={cartInfo}
          isLoading={isLoading}
          setToken={setToken}
        />
      </div>
    </>
  );
}

function MainList({ className, token }) {
  const arr = ["Home", "Products", "Categories", "Brands", "Order"];
  return (
    <>
      {token ? (
        <ul className={className}>
          {arr.map((navList, i) => (
            <li key={i}>
              <NavLink
                to={`${navList}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg duration-300 hover:text-green-600 hover:underline hover:scale-105 transition-color text-green-600 underline "
                    : " text-lg duration-300 hover:text-green-600 hover:underline hover:scale-105 transition-color"
                }
              >
                {navList}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
function LogoList({ className, token, cartInfo, isLoading, setToken }) {
  const LogoArr = [faInstagram, faFacebook, faTwitter, faTiktok, faLinkedin];
  const sign = ["Register", "Login"];
  const BASE_DESIGN =
    "text-lg hidden lg:block duration-300 hover:text-green-600  hover:scale-105 transition-color ";
  return (
    <ul className={className}>
      {token ? (
        <>
          <Link to="Cart" className="relative">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-lg hover:text-main"
            />
            <h5 className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-main text-white flex justify-center items-center ">
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                cartInfo?.numOfCartItems
              )}
            </h5>
          </Link>
          <Link to="Fav">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-600 hover:text-red-700 hover:text-lg transition-all  duration-500"
            />
          </Link>
        </>
      ) : null}
      {LogoArr.map((item, i) => (
        <li key={i}>
          <FontAwesomeIcon icon={item} />
        </li>
      ))}

      {!token ? (
        sign.map((item) => (
          <li key={item}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${BASE_DESIGN} transition-color text-green-600 underline`
                  : BASE_DESIGN
              }
              to={item}
            >
              {item}
            </NavLink>
          </li>
        ))
      ) : (
        <li>
          <LogOut onClick={() => setToken(null)} className="cursor-pointer" />
        </li>
      )}
    </ul>
  );
}
