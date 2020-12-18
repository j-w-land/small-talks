import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import config from "../config";

import { useAuth } from "../context/auth";

const Login = () => {
  /*  const { register, handleSubmit, errors } = useForm(); */

  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [message, setMessage] = useState();
  const history = useHistory();

  const [formData, updateFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log("handChange");
    console.log(formData);
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  /**
   * @api {get} /login/ Request User information
   * @apiName LoginUser
   * @apiGroup User
   *
   *  @apiExample Example usage:
   *     endpoint: /login/
   *
   *     body:
   *     {
   *       "username": Peter,
   *       "password": "Peter's password"
   *     }
   *
   * @apiParam {String} username Users username.
   * @apiParam {String} password Users password.
   *
   * @apiSuccess {String} message success.
   * @apiSuccess {String} username registered user's username.
   * @apiSuccess {Boolean} status login status after registering.
   * @apiSuccess {String} id user id.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "success",
   *       "username": username,
   *       "status": true,
   *       "id": userId,
   *     }
   *
   * @apiError error User not found / Username and password did not match. Please try again.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "success": false,
   *       "error": "User not found / Username and password did not match. Please try again."
   *        "status": false
   *     }
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage({
      data: "Logging in is in progress...",
      type: "alert-warning",
    });

    fetch(`${config.baseUrl}/user/login`, {
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
          data: hasError
            ? data.error
            : "Logged in successfully, redirecting...",
          type: hasError ? "alert-danger" : "alert-success",
        });

        //!data.error &&
        /*  setTimeout(() => {
            localStorage.setItem("token", data.token);
            history.push("/");
          }, 3000); */
        if (!data.error) {
          setAuthTokens(data);
          setLoggedIn(true);
        } else {
          setAuthTokens(data);
          setLoggedIn(false);
        }

        /* !error && e.target.reset(); */
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
      <div className={"loginFormContainer"}>
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
            className={`${"loginFormLegend"} border rounded p-1 text-center`}
          >
            Login Form
          </legend>
          <form>
            <div className="form-group">
              <label htmlFor="inputForUserName">Username</label>
              <span className="mandatory">*</span>
              <input
                id="inputForUserName"
                name="username"
                type="username"
                className="form-control"
                aria-describedby="Enter username"
                placeholder="Enter username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Login
              </button>

              <button className="btn btn-link ml-auto">
                <Link to="/register">New User</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
