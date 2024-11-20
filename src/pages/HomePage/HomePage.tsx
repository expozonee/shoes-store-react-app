import { Link } from "react-router-dom";
import "./HomePage.css";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function HomePage() {
  return (
    <div className="main__container">
      <div className="welcome__container">
        <h1>Welcome to Shoes store</h1>
        <Link to={"/store"}>
          <button> Start Shopping!</button>
        </Link>
        <hr />
        <SignInForm />
      </div>
    </div>
  );
}
