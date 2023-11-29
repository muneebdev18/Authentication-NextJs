"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  async function logout() {
    try {
      const response = await axios.get("/api/user/logout");
      console.log(response.data);
      if (response.data.success === true) {
        toast.success("LoggedOut Successfully", {
          position: "top-center",
        });
        router.push("/login");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex absolute flex-col justify-center items-center h-full w-full">
      <div className="text-3xl font-bold mb-4">Profile Page</div>
      <button
        className="bg-blue-500 text-lg py-3 px-5 rounded-lg mt-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default page;
