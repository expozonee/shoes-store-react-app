import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import Store from "./pages/Store/Store.tsx";
import StoreProducts, {
  storeLoader,
} from "./components/StoreProducts/StoreProducts.tsx";
import ProductPage, {
  productLoader,
} from "./pages/ProductPage/ProductPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "store",
    element: <Store />,
    children: [
      {
        index: true,
        element: <StoreProducts />,
        loader: storeLoader,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
        loader: productLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
