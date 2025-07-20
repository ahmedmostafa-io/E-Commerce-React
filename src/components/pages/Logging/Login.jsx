import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import Error from "../Error";
import { Link, useNavigate } from "react-router";
import { DefaultContext } from "../../context/Default.context";
import { TokenContext } from "../../context/Token.context";
import Button from "../../Button";
import LoadingCart from "./../LoadingCard";
export default function Login() {
  const [pass, setPass] = useState(true);
  const { isLoading, setIsLoading, error, setError } =
    useContext(DefaultContext);
  const { setToken } = useContext(TokenContext);

  const navigate = useNavigate();
  const formSchema = object({
    email: string().required().email(),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[0-9]/, "Must include at least one number")
      .matches(/[\W_]/, "Must include at least one special character"),
  });
  async function handleRequestData(values) {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      //localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("Loged in succesfully ", { duration: 1000 });
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (err) {
      if (!err.response) {
        setError("No internet connection");
        toast.error("No internet connection");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        setError("Unknown error occurred");
        toast.error("Unknown error occurred");
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleRequestData,
    validationSchema: formSchema,
  });
  const hasErrorEmail = Boolean(formik.errors.email && formik.values.email);
  const isValidEmail = Boolean(!formik.errors.email && formik.values.email);
  const hasErrorPass = Boolean(
    formik.errors.password && formik.values.password
  );
  const isValidPass = Boolean(
    !formik.errors.password && formik.values.password
  );
  if (isLoading) return <LoadingCart />;
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="pb-8  pt-28 *:space-y-4 ">
      <h2 className="text-3xl my-3">Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
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
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
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
        <div className="flex flex-row justify-between items-center mt-5 ">
          <Button type="submit" className="btn hover:bg-main-light ">
            Login
          </Button>
          <Link
            to="/forgetPass"
            className="underline text-main active:text-red-800"
          >
            forget password
          </Link>
        </div>
      </form>
    </div>
  );
}
