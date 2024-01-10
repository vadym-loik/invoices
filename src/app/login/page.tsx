import './login.scss';
import Button from '../../components/Button/Button';

const Login = () => {
  return (
    <>
      <div className="login">
        <h1 className="login__title">Login</h1>
        <form className="login__form">
          <div className="login__input--wrapper">
            <input
              className="login__input"
              name="email"
              type="email"
              placeholder="Name"
            />
            <p className="error-message"></p>
            <span className="login__input--error"></span>
          </div>
          <div className="login__input--wrapper">
            <input
              className="login__input"
              name="password"
              type="password"
              placeholder="Password"
            />
            <p className="error-message"></p>
            <span className="login__input--error"></span>
          </div>
          <Button
            className="btn"
            type="submit"
          >
            Enter
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
