// Register.js
import React, { useState } from "react";
/* import styles from "../Register.module.css"; */

import { Link } from "react-router-dom";
import config from "../config";

const CreatePostForm = (props) => {
  const [message, setMessage] = useState();
  const [formData, updateFormData] = useState({
    content: "",
    userId: props.authTokens.id,
    username: props.authTokens.username,
  });

  const { setLoading } = props;

  const [textLength, setTextLength] = useState(0);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    setTextLength(e.target.value.trim().length);
  };

  /**
   * @api {post} /posts/create/ Create New Post
   * @apiName CreateUser
   * @apiGroup Posts
   *
   *  @apiExample Example usage:
   *     endpoint: /create/post/
   *
   *     body:
   *     {
   *       content: "my post contet...",
   *       userId: userId,
   *       username: username,
   *     }
   *
   * @apiParam {String} content post content.
   * @apiParam {String} username Users unique username.
   * @apiParam {String} userId Users userId.
   *
   * @apiSuccess {String} message created.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "created",
   *     }
   *
   * @apiError error Http error message
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "error message"
   *     }
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage({
      data: "..",
      type: "alert-warning",
    });

    setLoading(true);

    fetch(`${config.baseUrl}/posts/create`, {
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
          data: hasError ? data.error : "talk posted",
          type: hasError ? "alert-danger" : "alert-success",
        });
        setLoading(false);
        document.getElementById("createPostForm").reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`${"elementContainer"} container-fluid d-flex align-items-top justify-content-center`}
    >
      <div className={"createPostFormContainer"}>
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
            new talk
          </legend>
          <form id="createPostForm">
            <div className="form-group">
              <label htmlFor="inputForName"></label>
              <span className="mandatory"></span>
              <input
                id="inputForName"
                type="text"
                className="form-control"
                aria-describedby="What's up?"
                placeholder="What's up?"
                name="content"
                maxLength="200"
                onChange={handleChange}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: 10,
                  display: "inline-block",
                  width: "10%",
                  float: "left",
                }}
              >
                <span> {textLength} / 200</span>
              </div>
              <div
                style={{ display: "inline-block", width: "90%", float: "left" }}
                className="d-flex align-items-center justify-content-center"
              >
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  onClick={handleSubmit}
                  style={{ paddingLeft: 20, paddingRight: 20 }}
                >
                  talk
                </button>
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
export default CreatePostForm;
