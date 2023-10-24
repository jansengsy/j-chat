import LoginForm from '../components/forms/LoginForm';

export default function Login() {

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome!</h1>
        <h2>Login to J-Chat</h2>
      </div>
      <LoginForm />
    </div>
  )
}