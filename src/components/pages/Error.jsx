import errorImg from "../../assets/images/error.svg";
export default function Error({ error = "wrong Page" }) {
  return (
    <div className="flex justify-center items-center pt-28 flex-col">
      <img
        src={errorImg}
        alt="error image"
        className="w-full h-[30rem] object-contain"
      />
      <p className="p-3">⛔{error}</p>
    </div>
  );
}
