import "./Store.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { useStore } from "../../provider/StoreProvider";
import { useUser } from "../../provider/UserProvider";

export default function Store() {
  const { isAdmin, isSignedIn, logout } = useUser();
  const { cartItems } = useStore();

  return (
    <>
      <header>
        <h3>logo</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
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
