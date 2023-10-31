import ResetPasswordForm from "../components/forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Reset your password</h1>
        <h4>Tell us your username and email and we will send you a password reset link</h4>
      </div>
      <ResetPasswordForm />
    </div>
  );
}