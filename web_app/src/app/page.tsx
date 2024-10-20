'use client'
import SwapWrapper from "./components/swap-wrapper";
import Pool from "./components/pool";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export default function Home() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Pool />,
    },
    {
      path: "/pool",
      element: <SwapWrapper />,
    }
  ]);
    return (
      <RouterProvider router={router} />
  );
}
