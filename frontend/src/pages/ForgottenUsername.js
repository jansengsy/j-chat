import ForgottenUsernameForm from "../components/forms/ForgottenUsernameForm";

export default function ForgottenUsername() {
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Forgotten Username</h1>
        <h4>Enter your email to be sent a reminder</h4>
      </div>
      <ForgottenUsernameForm />
    </div>
  );
}
