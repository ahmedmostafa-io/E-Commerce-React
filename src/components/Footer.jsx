import amazonLogo from "../assets/images/amazon-pay.png";
import americanLogo from "../assets/images/American-Express-Color.png";
import masterLogo from "../assets/images/mastercard.webp";
import paypalLogo from "../assets/images/paypal.png";
import googleLogo from "../assets/images/get-google-play.png";
import appleLogo from "../assets/images/get-apple-store.png";
import Button from "./Button";
import { useState } from "react";

export default function Footer() {
  const [query, setQuery] = useState("");
  function handleForm(e) {
    e.preventDefault();
    setQuery("");
  }
  return (
    <footer className="bg-slate-300  w-full py-8">
      <div className="container space-y-5">
        <div className="space-y-1">
          <h3 className="text-slate-600 text-3xl font-semibold font-encode">
            Get the FreshCard app
          </h3>
          <p className="text-slate-500 text-sm font-semibold">
            We will send you alink open it on your phone to download the app 😉.
          </p>
        </div>
        <form className="flex gap-3" onClick={handleForm}>
          <input
            type="text"
            placeholder="email..."
            className="input grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="btn hover:bg-main-light cursor-pointer">
            Share App Link
          </Button>
        </form>

        <div className=" justify-center items-center flex-col flex lg:flex-row lg:justify-between lg:items-center border-y border-gray-400 py-2">
          <div className="flex gap-3 items-center border-b  border-gray-400 lg:border-0">
            <h3>Payment Partners</h3>
            <img src={amazonLogo} alt="" className="w-15 object-contain" />
            <img src={americanLogo} alt="" className="w-15" />
            <img src={masterLogo} alt="" className="w-15" />
            <img src={paypalLogo} alt="" className="w-15" />
          </div>
          <div className="flex gap-3 items-center pt-2 lg:pt-0">
            <p className="font-encode text-sm">Get deliveries with freshcard</p>
            <img src={googleLogo} alt="" className="w-15 object-contain" />
            <img src={appleLogo} alt="" className="w-15 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
