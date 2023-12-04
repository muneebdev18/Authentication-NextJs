"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [data, setData] = useState("");
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

  const myDetails = async () => {
    try {
      const baseUrl = `http://localhost:3000/api/user/me`;
      const response = await axios.get(baseUrl);
      console.log("mydetails", response);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    myDetails();
  }, []);
  // destructuing the data coming from api
  const { _id, username, email } = data;
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      <div className="text-2xl font-bold">
        Profile <span className="bg-orange-500 p-2 rounded-lg ml-2">Page</span>
      </div>
      <div className="mt-5 text-xl">
        <p className="mt-2">
          Id:
          <span className="ml-3 text-center">{_id}</span>
        </p>
        <p className="mt-2">
          Name:<span className="ml-3 text-center">{username}</span>
        </p>
        <p className="mt-2">
          Email:<span className="ml-3 text-center">{email}</span>
        </p>
      </div>
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
