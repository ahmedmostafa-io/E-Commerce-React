import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { object, ref, string } from "yup";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { DefaultContext } from "../../context/Default.context";
import Button from "../../Button";
import Error from "../Error";
import LoadingCart from "./../LoadingCard";
export default function Register() {
  const [pass, setPass] = useState(true);
  const [pass2, setPass2] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { error, setError, isLoading, setIsLoading } =
    useContext(DefaultContext);
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const navigate = useNavigate();
  const formSchema = object({
    name: string()
      .required("name is required")
      .min(3, "user name must be at least 3 chars")
      .matches(
        /^[A-Z][a-zA-Z0-9_-]{2,14}$/,
        "Username must start with an uppercase letter and be 3-15 characters long"
      ),
    email: string().required("email is required").email("email must be valid"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[0-9]/, "Must include at least one number")
      .matches(/[\W_]/, "Must include at least one special character"),
    rePassword: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[0-9]/, "Must include at least one number")
      .matches(/[\W_]/, "Must include at least one special character")
      .oneOf([ref("password")], "Re-password must match with password"),
    phone: string().required().matches(phoneRegex, "must be egyption number"),
  });
  async function handleSendData(values) {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      const response = await axios.request(options);
      console.log(response);
      toast.success("registerd succefully", { duration: 1000 });
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (err) {
      if (err.message === "Network Error") {
        setError("No internet connection");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("unKnown Problem");
      }
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleSendData,
    validationSchema: formSchema,
  });
  const hasError = Boolean(formik.errors.name && formik.values.name);
  const isValid = Boolean(!formik.errors.name && formik.values.name);
  const hasErrorEmail = Boolean(formik.errors.email && formik.values.email);
  const isValidEmail = Boolean(!formik.errors.email && formik.values.email);
  const hasErrorPass = Boolean(
    formik.errors.password && formik.values.password
  );
  const isValidPass = Boolean(
    !formik.errors.password && formik.values.password
  );
  const hasErrorRepass = Boolean(
    formik.errors.rePassword && formik.values.rePassword
  );
  const isValidRepass = Boolean(
    !formik.errors.rePassword && formik.values.rePassword
  );
  const hasErrorTel = Boolean(formik.errors.phone && formik.values.phone);
  const isValidTel = Boolean(!formik.errors.phone && formik.values.phone);

  if (isLoading) return <LoadingCart />;
  if (error && error !== "Account Already Exists") {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="pb-8 pt-20">
        <h2 className="text-3xl my-3">Register Now:</h2>
        {error === "Account Already Exists" ? (
          <p className="text-red-600 text-2xl"> ⛔ Account Already Exists</p>
        ) : (
          ""
        )}
        <form className="**:my-2" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              className={`input w-full bg-slate-100  ${
                hasError
                  ? "border-b border-red-500"
                  : isValid
                  ? "border-b border-green-500"
                  : ""
              }`}
              value={formik.values.name}
              name="name"
              onChange={formik.handleChange}
            />
          </div>
          {hasError && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              className={`input w-full bg-slate-100  ${
                hasErrorEmail
                  ? "border-b border-red-500"
                  : isValidEmail
                  ? "border-b border-green-500"
                  : ""
              }`}
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
            />
          </div>
          {hasErrorEmail && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
          <div className="relative">
            <label htmlFor="pass">Password:</label>
            <input
              type={pass ? "password" : "text"}
              id="pass"
              className={`input w-full bg-slate-100  ${
                hasErrorPass
                  ? "border-b border-red-500"
                  : isValidPass
                  ? "border-b border-green-500"
                  : ""
              }`}
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
            />
            {pass ? (
              <EyeOff
                className="cursor-pointer absolute right-3 top-8"
                onClick={() => setPass(!pass)}
              />
            ) : (
              <Eye
                className="cursor-pointer absolute right-3 top-8"
                onClick={() => setPass(!pass)}
              />
            )}
          </div>
          {hasErrorPass && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
          <div className="relative">
            <label htmlFor="re-pass">Confirm password:</label>
            <input
              type={pass2 ? "password" : "text"}
              id="re-pass"
              className={`input w-full bg-slate-100  ${
                hasErrorRepass
                  ? "border-b border-red-500"
                  : isValidRepass
                  ? "border-b border-green-500"
                  : ""
              }`}
              value={formik.values.rePassword}
              name="rePassword"
              onChange={formik.handleChange}
            />
            {pass2 ? (
              <EyeOff
                className="cursor-pointer absolute right-3 top-8"
                onClick={() => setPass2(!pass2)}
              />
            ) : (
              <Eye
                className="cursor-pointer absolute right-3 top-8"
                onClick={() => setPass2(!pass2)}
              />
            )}
          </div>
          {hasErrorRepass && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.rePassword}
            </div>
          )}
          <div>
            <label htmlFor="tele">Phone:</label>
            <input
              type="tel"
              id="tele"
              className={`input w-full bg-slate-100  ${
                hasErrorTel
                  ? "border-b border-red-500"
                  : isValidTel
                  ? "border-b border-green-500"
                  : ""
              }`}
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
            />
          </div>
          {hasErrorTel && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone}
            </div>
          )}
          <div className="flex flex-row-reverse mt-5 ">
            <Button type="submit" className="btn hover:bg-main-light ">
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
