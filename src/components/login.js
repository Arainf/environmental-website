import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import validation from "./loginValidation";
import './css/login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Get the navigate object

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));

    if (!values.email || !values.password) {
      console.error("Input fields cannot be empty. Data not saved.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // User is authenticated, navigate to the Admin route
        console.log("Authentication successful");
        props.onSuccessfulLogin();
        navigate("/Admin"); // Redirect to the Admin route
      } else {
        // Authentication failed, handle the error
        setErrors({ password: "Password or email doesn't match." });
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <div className="d-flex justify-content-center align-items-center bgli vh-100">
        <div className="wrap backgroundli p-3 rounded w-25">
          <img src={require('./css/img/311576263_477527001067732_5546581579231624950_n-removebg-preview.png')} alt="DENR_LOGO" className="mb-2" />
          <h2 className="mb-0">MyDENR</h2>
          <span style={{ textAlign: "center" }}>
            <p className="text tb-0"><small><em><q>Nature's Protectors</q></em></small></p>
          </span>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-2 input">
              {/* <label htmlFor="email">
                <strong>Email</strong>
              </label> */}
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInput}
                className="form-control  rounded-2"
                style={{ border: '0px solid rgba(0, 0, 0, 0.075)' }}
              />
              <span className="input100"></span>
              <span className="symbol-user"><FontAwesomeIcon icon="fa-solid fa-user" style={{ color: "#727479", }} /></span>
            </div>
            {errors.email && (
              <span className="text-danger mt-0 mb-0">{errors.email}</span>
            )}
            <div className="mb-0 mt-0 input">
              {/* <label htmlFor="password">
                <strong>Password</strong>
              </label> */}
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInput}
                className="form-control rounded-2"
                style={{ border: '0px solid rgba(0, 0, 0, 0.075)' }}
              />
              <span className="input100"></span>
              <span className="symbol-lock"><FontAwesomeIcon icon="fa-solid fa-lock" style={{ color: "#727479", }} /></span>
            </div>
            {errors.password && (
              <span className="text-danger mt-0 mb-0">{errors.password}</span>
            )}
            <button type="submit" className="btn mt-3 btn-success w-100 rounder-0">
              <strong>Log in</strong>
            </button>
            <Link
              to="/Signup"
              className="btn btn-default w-100 rounder-0 text-decoration-none text-white"
            >
              Forgot Account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
