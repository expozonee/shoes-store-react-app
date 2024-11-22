import { Link, useRouteError } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const error = useRouteError();

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Error: {`${error}`}</p>
      <Link to={"/"}>
        <button>Go back to the homepage</button>
      </Link>
    </div>
  );
}
