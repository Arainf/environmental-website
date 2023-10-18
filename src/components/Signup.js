import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpValidation from "./signupvalidation";
import './css/signup.css';

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };


  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(SignUpValidation(values));

    // Check if any of the input fields are empty
    if (!values.name || !values.email || !values.password) {
      console.error("Input fields cannot be empty. Data not saved.");
      return;
    }


    try {
      const response = await fetch("http://localhost:3000/api/saveData/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send the form data as JSON
      });

      if (response.ok) {
        // Data saved successfully
        console.log("Data saved successfully");

        setValues({
          name: "",
          email: "",
          password: "",
        });
      } else {
        // Handle errors
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <>
      <div className="d-flex justify-content-center align-items-center bgsu vh-100">
        <div className="backgroundsu p-3 rounded w-25">
          <h1>Sign-Up</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
                className="form-control rounded-2"
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
                className="form-control rounded-2"
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                className="form-control rounded-2"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 rounder-0">
              <strong>Sign Up</strong>
            </button>
            <p>You agree with our policies</p>
            <Link
              to="/Login"
              className="btn btn-default border w-100 backgroundsu rounder-0 text-decoration-none text-white"
            >
              Log In
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
