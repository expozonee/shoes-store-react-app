import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Store from "./pages/Store/Store.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import UserProvider from "./provider/UserProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StoreProducts, {
  removeProductAction,
  storeLoader,
} from "./components/StoreProducts/StoreProducts.tsx";
import ProductPage, {
  productLoader,
  updateProductAction,
} from "./pages/ProductPage/ProductPage.tsx";
import StoreProvider from "./provider/StoreProvider.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import NewProduct, {
  action as addNewAction,
} from "./pages/NewProduct/NewProduct.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/store",
    element: <Store />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <StoreProducts />,
        loader: storeLoader,
        action: removeProductAction,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
        loader: productLoader,
        action: updateProductAction,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "add",
        element: <NewProduct />,
        action: addNewAction,
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
