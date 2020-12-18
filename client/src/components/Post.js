// Register.js
import React, { useState } from "react";
/* import styles from "../Register.module.css"; */

import { Link } from "react-router-dom";
import config from "../config";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Post = (props) => {
  const [message, setMessage] = useState();
  const [formData, updateFormData] = useState({
    talkField: "",
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="elementContainer container-fluid d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: "100%" }}>
        <Card.Header as="h5">
          <span style={{ fontStyle: "italic", color: "lightblue" }}>
            talking:{" "}
          </span>
          <Link
            to={{
              pathname: "/",
              state: {
                personalBoard: true,
                userPage: false,
                userName: props.postObj.userName,
              },
            }}
          >
            {" "}
            <span>{props.postObj.userName}</span>
          </Link>{" "}
          {/*   <span style={{ float: "right" }}>{props.postObj.author}</span> */}
        </Card.Header>
        <Card.Body>
          <Card.Text>{props.postObj.content}</Card.Text>
          {/*       <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};
export default Post;
