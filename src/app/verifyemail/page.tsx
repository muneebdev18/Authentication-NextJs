"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

const verifyEmail = () => {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);

  const verifiedEmailHandler = async () => {
    try {
      const response = await axios.post("/api/user/emailVerify", { token });
      setVerified(true);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const tokenUrl = window.location.search.split("=")[1];
    setToken(tokenUrl);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifiedEmailHandler();
    }
  }, [token]);
  return (
    <>
      <div>
        <div>
          <p> {token ? `${token}` : "no token"}</p>
        </div>
        <div>
          {verified ? (
            <Link href={"/login"}>Go To Login</Link>
          ) : (
            "Verification Pending"
          )}
        </div>
      </div>
    </>
  );
};

export default verifyEmail;
