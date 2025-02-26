import "./LogIn.scss";
import { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [showProfil, setShowProfil] = useState(false);
  return (
    <>
      <div className="login-logo">
        <img src="kanibal_doo_logo.png" />
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="loginInputEmail1" className="form-label">
            Vaš Email
          </label>
          <input
            type="email"
            className="form-control"
            id="loginInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserName(e.target.value)}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="loginInputPassword1" className="form-label">
            Lozinka
          </label>
          <input
            type="password"
            className="form-control"
            id="loginInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Zapamti me
          </label>
        </div>
        <button
          type="submit"
          className="login-button btn btn-success"
          onClick={(e) => e.preventDefault()}
        >
          Prijavi me
        </button>
      </form>
    </>
  );
}

export default Login;
