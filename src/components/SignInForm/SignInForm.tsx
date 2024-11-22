import "./SignInForm.css";
import { BaseSyntheticEvent, useRef } from "react";
import { useUser } from "../../provider/UserProvider";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { login } = useUser();

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
    let msg = {};

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) {
      msg = {
        ...msg,
        email: "Email is required",
      };
    }

    if (!password) {
      msg = {
        ...msg,
        password: "Password is required",
      };
    }

    if (Object.keys(msg).length > 0 || !email || !password) return msg;

    const status = login(email, password);

    if (!status.ok) {
      console.log("error sign in");
      return;
    }

    navigate("/store");
  }

  return (
    <form onSubmit={handleSubmit} className="sign-in-form">
      <label htmlFor="email">Email</label>
      <input ref={emailRef} type="text" name="email" />
      <label htmlFor="password">Password</label>
      <input ref={passwordRef} type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
