import errorImg from "../../assets/images/error.svg";
export default function Error({ error = "wrong Page" }) {
  const message =
    typeof error === "string"
      ? error
      : error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";

  return (
    <div className="flex justify-center items-center pt-28 flex-col">
      <img
        src={errorImg}
        alt="error image"
        className="w-full h-[30rem] object-contain"
      />
      <p className="p-3">⛔{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="my-4 bg-main text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-main-light transition"
      >
        Reload Page
      </button>
    </div>
  );
}
