"use client";
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  console.log(user);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    }
  }, [user]);

  const loginInHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log(response.data);
    } catch (error) {
      console.log("Error in SignIn", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-5 font-bold">
        Login{" "}
        <span className="bg-orange-500 py-2 px-2 mx-1 rounded-lg">Here</span>
      </h1>
      {isLoading ? <Spinner color="primary" /> : ""}
      <hr />
      <label className="mb-2" htmlFor="username">
        Email
      </label>
      <input
        className="px-3 py-3 mb-3 rounded-lg text-black outline-none"
        type="text"
        id="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label className="mb-2" htmlFor="username">
        Password
      </label>
      <input
        className="px-3 py-3 rounded-lg text-black outline-none"
        type="password"
        id="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <div className="mt-6 mb-3">
        <button
          disabled={buttonDisable}
          className={
            buttonDisable
              ? "bg-gray-600 py-2 px-3 rounded-md"
              : " py-2 px-3 bg-zinc-700 rounded-md hover:opacity-80 "
          }
          onClick={loginInHandler}
        >
          {buttonDisable ? "Button is Disabled" : "Click Here to Login"}
        </button>
      </div>
      <Link className="hover:opacity-50" href={"/signup"}>
        Not have an Account? Signup Here
      </Link>
    </div>
  );
}
