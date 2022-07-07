import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { login, userProfile } from "../services/auth.service";

import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const resp = await login(values);
      console.log(resp.data);

      if (resp.data.data.token) {
        localStorage.setItem("token", resp.data.data.token);
        toast.success("User logged in successfully", { duration: 3000 });

        localStorage.setItem("user", JSON.stringify(resp.data.data.user));
        navigate("/dashboard/owners");
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.response.data);
    }
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="w-[500px] bg-white shadow-lg border-t py-10 mt-12 mx-auto rounded-lg">
        {/* <img
          src="/img/logo.png"
          alt="rra logo"
          className="w-64 block mx-auto"
        /> */}
        <form className="mt-12 px-10" onSubmit={handleSubmit}>
          <div className="mb-10 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-black">Login</h1>
            <p className="flex gap-1 text-base">
              <span className="text-[#ADB5BD] font-semibold">
                Already have an account?
              </span>
              <Link className="text-primary-600 font-semibold" to="/signup">
                Sign up
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-black"
              >
                Email address
              </label>
              <input
                name="email"
                onChange={handleChange}
                id="email"
                placeholder="john@gmail.com"
                className=" rounded-xl border border-gray-400 text-black sm:text-sm outline-none focus:ring-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-black"
              >
                Password
              </label>
              <input
                required
                name="password"
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="rounded-xl border border-gray-400 text-black sm:text-sm outline-none focus:ring-blue-500 block w-full p-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 mb-4 rounded-xl font-semibold flex justify-center items-center w-full text-white bg-primary-600 p-3 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
