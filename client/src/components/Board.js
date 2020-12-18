import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useLocation, Redirect, Link } from "react-router-dom";
import config from "../config";
import CreatePostForm from "./CreatePostForm";
import Post from "./Post";

const Board = (props) => {
  console.log("Board_props");
  console.log(props);
  let location = useLocation();
  console.log("location");
  console.log(location);

  // check whether site directed to personal board or the general board
  let personal = false;
  let userPage = false;
  let pageUserName = "";

  try {
    personal = location.state.personalBoard;
    userPage = location.state.userPage;
    pageUserName = location.state.userName;
  } catch (error) {}
  console.log(personal);
  const { authTokens } = useAuth();
  console.log("useAuth_testing");
  console.log(authTokens);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * @api {get} /posts/user/{:username} Get Posts
   * @apiName GetPosts
   * @apiGroup Posts
   *
   *  @apiExample Example usage:
   *     endpoint: /posts/user/
   *

   *
   * @apiParam {String} username Users username. {if empty -> get all posts}
   *
   * @apiSuccess {Array} array array of post objects.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "array": [array of post objects],
   *     }
   *
   * @apiError error Error message
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": error message
   *     }
   */

  useEffect(() => {
    // if user not logged in and clicked personal page, redirect to login page
    if (!authTokens.status && userPage) {
      return;
    }
    const getAPI = async () => {
      let username = "";

      if (authTokens.status && personal) {
        try {
          username = authTokens.username;
        } catch (error) {}
      }

      if (!userPage && personal) {
        try {
          username = location.state.userName;
        } catch (error) {}
      }

      const response = await fetch(`${config.baseUrl}/posts/user/${username}`);
      const data = await response.json();

      try {
        setPosts(data.reverse());
      } catch (error) {}
    };
    getAPI();
  }, [personal, userPage, loading, pageUserName]);

  // if user not logged in and clicked user page, redirect to login page
  if (!authTokens.status && userPage) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {!personal && <h1> home of talks</h1>}
      {userPage && <h1> my talks</h1>}
      {!userPage && personal && <h1> {location.state.userName}'s talks</h1>}
      {userPage && (
        <CreatePostForm authTokens={authTokens} setLoading={setLoading} />
      )}

      {posts.map((n, i) => {
        {
        }
        return <Post key={"post-" + i} authTokens={authTokens} postObj={n} />;
      })}
    </div>
  );
};
export default Board;
