import { Link } from "react-router-dom";
import "./HomePage.css";
import SignInForm from "../../components/SignInForm/SignInForm";
import { useUser } from "../../provider/UserProvider";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div className="main__container">
      <div className="welcome__container">
        <h1>Welcome to Shoes store</h1>
        <Link to={"/store"}>
          <button> Start Shopping!</button>
        </Link>
        <hr />
        {isSignedIn ? null : <SignInForm />}
      </div>
    </div>
  );
}
