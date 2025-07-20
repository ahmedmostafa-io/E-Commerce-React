// components/CartLoader.jsx
import React from "react";

export default function LoadingCart() {
  return (
    <div className="flex flex-col mt-16 items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 overflow-hidden rounded-[20%] z-0">
          <div className="w-full h-full bg-green-500 animate-fillInsideCart" />
        </div>

        <svg
          className="w-full h-full text-white z-10 relative"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 18C6.45 18 5.979 18.21 5.586 18.586C5.21 18.979 5 19.45 5 20C5 20.55 5.21 21.021 5.586 21.414C5.979 21.79 6.45 22 7 22C7.55 22 8.021 21.79 8.414 21.414C8.79 21.021 9 20.55 9 20C9 19.45 8.79 18.979 8.414 18.586C8.021 18.21 7.55 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.65L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5.48C20.95 5.34 21 5.18 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C16.45 18 15.979 18.21 15.586 18.586C15.21 18.979 15 19.45 15 20C15 20.55 15.21 21.021 15.586 21.414C15.979 21.79 16.45 22 17 22C17.55 22 18.021 21.79 18.414 21.414C18.79 21.021 19 20.55 19 20C19 19.45 18.79 18.979 18.414 18.586C18.021 18.21 17.55 18 17 18Z" />
        </svg>
      </div>

      <p className="mt-4 text-lg font-semibold text-gray-600 animate-pulse">
        Loading your cart...
      </p>
    </div>
  );
}
