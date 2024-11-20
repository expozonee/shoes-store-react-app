import "./SignInForm.css";

export default function SignInForm() {
  return (
    <form className="sign-in-form">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
