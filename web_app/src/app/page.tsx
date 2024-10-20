'use client'
import Pool from "./components/pool";
import NewPosition from "./components/new-position";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SwapWrapper from "./components/swap-wrapper";

export default function Home() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NewPosition />,
    },
    {
      path: "/pool",
      element: <Pool />,
    },
    {
      path: "/new_position",
      element: <NewPosition />,
    }
  ]);
    return (
      <RouterProvider router={router} />
  );
}
