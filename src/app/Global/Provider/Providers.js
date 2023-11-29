"use client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import store from "../Store/store";
function Providers({ children }) {
  return (
    <NextUIProvider>
      <Provider store={store}>{children}</Provider>
    </NextUIProvider>
  );
}

export default Providers;
