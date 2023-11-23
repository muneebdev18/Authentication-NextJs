"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SignupPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    }
  }, [user]);

  const signUp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log(response.data);
      if (response.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-5 font-bold">
        {isLoading ? (
          "Loading Please Wait..."
        ) : (
          <div>
            SignUp
            <span className="bg-orange-500 rounded-lg py-2 px-2 ml-2">
              Here
            </span>
          </div>
        )}
      </h1>
      <hr />
      <label className="mb-2" htmlFor="username">
        Username
      </label>
      <input
        className="px-3 py-3 mb-3 rounded-lg text-black outline-none"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="Enter Username"
      />
      <label className="mb-2" htmlFor="username">
        Email
      </label>
      <input
        className="px-3 py-3 mb-3 rounded-lg text-black outline-none"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="Enter Email"
      />
      <label className="mb-2" htmlFor="username">
        Password
      </label>
      <input
        className="px-3 py-3 rounded-lg text-black outline-none"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="Enter Password"
      />
      <div className="mt-6 mb-3">
        <button
          disabled={buttonDisable && buttonDisable}
          onClick={signUp}
          className="py-2 px-3 bg-zinc-700 rounded-md hover:opacity-80 "
        >
          {buttonDisable ? "Button is Disable" : "Click Here to Signup"}
        </button>
      </div>
      <Link className="hover:opacity-50" href={"/login"}>
        Already Registered ? Go To Login
      </Link>
    </div>
  );
}
