import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Store from "./pages/Store/Store.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import UserProvider from "./provider/UserProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StoreProducts, {
  storeLoader,
} from "./components/StoreProducts/StoreProducts.tsx";
import ProductPage, {
  productLoader,
} from "./pages/ProductPage/ProductPage.tsx";
import StoreProvider from "./provider/StoreProvider.tsx";

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
    <UserProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </UserProvider>
  </StrictMode>
);
