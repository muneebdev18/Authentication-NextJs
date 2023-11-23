import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex justify-center items-center min-h-screen text-2xl">
      UserProfile{" "}
      <span className="bg-orange-500 p-2 rounded-lg ml-2">{params.id}</span>
    </div>
  );
}
