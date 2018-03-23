import React, { Component } from "react";
import axios from "../../../Axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
// import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: null,
    selectedPost: null,
    error: false
  };

  componentDidMount = () => {
    console.log(this.props);

    axios
      .get("/posts")
      .then(Response => {
        var posts = Response.data.slice(0, 4);
        var postsMapById = posts.reduce((prev, curEle) => {
          prev[curEle.id] = { ...curEle, author: "Shantanu" };
          return prev;
        }, {});

        this.setState({ posts: postsMapById });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  onPostClickHandler = postId => {
    //this.setState({ selectedPost: postId });
    this.props.history.push({ pathname: "/posts/" + postId });
  };

  render() {
    if (!this.state.error) {
      if (this.state.posts) {
        var posts = Object.values(this.state.posts).map(post => {
          return (
            // This is one way of rendering page based on selected id. Alternative is using
            // history.push method as done above
            // <NavLink to={{ pathname: "/" + post.id }} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              Clicked={() => this.onPostClickHandler(post.id)}
            />
            // </NavLink>
          );
        });

        return (
          <div>
            <section className="Posts">{posts}</section>
            <Route
              path={this.props.match.url + "/:id"}
              exact
              component={FullPost}
            />
          </div>
        );
      } else {
        return <p style={{ textAlign: "center" }}>Loading Data !!</p>;
      }
    } else {
      alert("Something went wrong !!");
    }
  }
}

export default Posts;
