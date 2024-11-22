/* eslint-disable react-hooks/exhaustive-deps */
import "./Store.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { useStore } from "../../provider/StoreProvider";
import { useUser } from "../../provider/UserProvider";
import { useEffect } from "react";

export default function Store() {
  const { isAdmin, isSignedIn, logout } = useUser();
  const { cartItems, fetchCartItems } = useStore();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <header className="store__header">
        <Link to={"/"}>
          <h3 className="logo">Shoes Store</h3>
        </Link>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to={"/store"}>
            <button>Store</button>
          </Link>
          <Link className="cart-link" to={"/store/cart"}>
            <button>cart</button>
            <small className="cart-counter">{cartItems.length}</small>
          </Link>
          {isAdmin && (
            <Link to={"/store/add"}>
              <button>Add New Product</button>
            </Link>
          )}
          {isSignedIn && <button onClick={() => logout()}>Log out</button>}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
