import "./HomePage.css";
import { Link } from "react-router-dom";
import SignInForm from "../../components/SignInForm/SignInForm";
import { useUser } from "../../provider/UserProvider";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div className="main__container">
      <div className="welcome__container">
        <div className="image__container">
          <img
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <h1>Welcome to Shoes store</h1>
        <Link
          to={"/store"}
          style={{ marginBottom: `${isSignedIn ? "3rem" : ""}` }}
        >
          <button> Start Shopping!</button>
        </Link>

        {isSignedIn ? null : (
          <>
            <hr />
            <SignInForm />
          </>
        )}
      </div>
    </div>
  );
}
