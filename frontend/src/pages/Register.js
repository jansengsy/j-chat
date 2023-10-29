import RegistrationForm from '../components/forms/RegistrationForm'; 

export default function Register() {
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Register to J-Chat!</h1>
        <h4>Create your account</h4>
      </div>
      <RegistrationForm />
    </div>
  )
}
