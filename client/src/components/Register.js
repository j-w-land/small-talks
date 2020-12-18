// Register.js
import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
/* import styles from "../Register.module.css"; */

import { Link } from "react-router-dom";
import config from "../config";
import { useAuth } from "../context/auth";

const Register = () => {
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [message, setMessage] = useState();
  const [formData, updateFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  /**
   * @api {post} /register/ Register New User
   * @apiName RegisterUser
   * @apiGroup User
   *
   *  @apiExample Example usage:
   *     endpoint: /register/
   *
   *     body:
   *     {
   *       "username": Peter,
   *       "password": "Peter's password"
   *     }
   *
   * @apiParam {String} username Users unique username.
   * @apiParam {String} password Users password.
   *
   * @apiSuccess {String} message success.
   * @apiSuccess {String} username registered user's username.
   * @apiSuccess {Boolean} status login status after registering.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "success",
   *       "username": username,
   *       "status": true,
   *     }
   *
   * @apiError error User name already registered. Kindly try another one!
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "success": false,
   *       "error": "User name already registered. Kindly try another one!"
   *     }
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });

    fetch(`${config.baseUrl}/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully",
          type: hasError ? "alert-danger" : "alert-success",
        });

        if (!data.error) {
          setAuthTokens(data);
          setLoggedIn(true);
        } else {
          setAuthTokens(data);
          setLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { personalBoard: true, userPage: true },
        }}
      />
    );
  }

  return (
    <div
      className={`${"container"} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={"registrationFormContainer"}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${"registrationFormLegend"} border rounded p-1 text-center`}
          >
            Registration Form
          </legend>
          <form>
            <div className="form-group">
              <label htmlFor="inputForName">Your Name</label>
              <span className="mandatory">*</span>
              <input
                id="inputForName"
                type="text"
                className="form-control"
                aria-describedby="Enter your user name"
                placeholder="Enter your user name"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button className="btn btn-link">
                <Link to="/login">Cancel</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
export default Register;
