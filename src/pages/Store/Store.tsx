import "./Store.css";
import { Outlet } from "react-router";

export default function Store() {
  return (
    <>
      <header>
        <h3>logo</h3>
        <div>
          <p>cart</p>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
