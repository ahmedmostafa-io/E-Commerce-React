import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import Button from "../Button";
import LoadingCart from "./LoadingCard";
import { DefaultContext } from "../context/Default.context";

export default function ForgetPass() {
  const { isLoading, setIsLoading, setError } = useContext(DefaultContext);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const schema = object({
    email: string().required("Email is required").email("Invalid email format"),
  });

  const sendCode = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      setLocalError(null);

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      toast.success("Reset code sent to your email");
      setTimeout(() => {
        navigate("/resetPass");
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(
        message.includes("no user") ? "This email is not registered." : message
      );
      setLocalError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: sendCode,
  });

  const hasErrorEmail = Boolean(formik.errors.email && formik.touched.email);
  const isValidEmail = Boolean(!formik.errors.email && formik.touched.email);

  if (isLoading) return <LoadingCart />;

  return (
    <div className="pb-8 pt-28 *:space-y-4">
      <h2 className="text-3xl my-3">Forgot Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`input w-full bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 ${
              hasErrorEmail
                ? "border-b border-red-500 focus:ring-red-300"
                : isValidEmail
                ? "border-b border-green-500 focus:ring-green-300"
                : "focus:ring-blue-300"
            }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {hasErrorEmail && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        {localError && (
          <p className="text-red-600 text-sm mt-3 font-medium">{localError}</p>
        )}

        <div className="flex flex-row justify-between items-center mt-5">
          <Button
            type="submit"
            className="btn hover:bg-main-light"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Code"}
          </Button>
          <Link to="/Login" className="underline text-main active:text-red-800">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
