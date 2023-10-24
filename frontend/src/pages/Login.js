import LoginForm from '../components/forms/LoginForm';

export default function Login() {

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome to J-Chat!</h1>
        <h4>Login to your account</h4>
      </div>
      <LoginForm />
    </div>
  )
}