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
      element: <SwapWrapper />,
    },
    {
      path: "/pool",
      element: <Pool />,
    }
  ]);
    return (
      <RouterProvider router={router} />
  );
}
