import ResetPasswordForm from "../components/forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Reset your password</h1>
        <h4>Enter your new password</h4>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
