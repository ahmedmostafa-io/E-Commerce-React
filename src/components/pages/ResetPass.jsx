import { useFormik } from "formik";
import { useContext } from "react";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../Button";
import LoadingCart from "./LoadingCard";
import { DefaultContext } from "../context/Default.context";
import Login from "./Logging/Login";

export default function ResetPass() {
  const { isLoading, setIsLoading, error, setError } =
    useContext(DefaultContext);
  const navigate = useNavigate();

  const schema = object({
    resetCode: string().required("Code is required"),
    newPassword: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleReset = async (values) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );

      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      if (message.toLowerCase().includes("invalid reset code")) {
        toast.error("The reset code is invalid or expired.");
      } else {
        toast.error(message);
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      resetCode: "",
      newPassword: "",
    },
    validationSchema: schema,
    onSubmit: handleReset,
  });

  const hasError = (field) =>
    Boolean(formik.errors[field] && formik.touched[field]);

  if (isLoading) return <LoadingCart />;
  if (error) return <Login />;

  return (
    <div className="pb-8 pt-28 *:space-y-4">
      <h2 className="text-3xl my-3">Reset Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="resetCode">Reset Code</label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            className={`input w-full bg-slate-100 ${
              hasError("resetCode")
                ? "border-b border-red-500"
                : formik.values.resetCode
                ? "border-b border-green-500"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
          />
          {hasError("resetCode") && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.resetCode}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={`input w-full bg-slate-100 ${
              hasError("newPassword")
                ? "border-b border-red-500"
                : formik.values.newPassword
                ? "border-b border-green-500"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {hasError("newPassword") && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="btn hover:bg-main-light mt-5">
          Reset Password
        </Button>
      </form>
    </div>
  );
}
