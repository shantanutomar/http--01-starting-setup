import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "../../Axios";

class Blog extends Component {
  state = {
    posts: null,
    selectedPost: null,
    error: false
  };

  componentDidMount = () => {
    axios
      .get("/posts")
      .then(Response => {
        var posts = Response.data.slice(0, 4);
        var postsMapById = posts.reduce((prev, curEle) => {
          prev[curEle.id] = { ...curEle, author: "Shantanu" };
          return prev;
        }, {});

        console.log(postsMapById);
        this.setState({ posts: postsMapById });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  onPostClickHandler = postId => {
    this.setState({ selectedPost: postId });
  };

  render() {
    if (!this.state.error) {
      if (this.state.posts) {
        var posts = Object.values(this.state.posts).map(post => {
          return (
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              Clicked={() => this.onPostClickHandler(post.id)}
            />
          );
        });

        return (
          <div>
            <section className="Posts">{posts}</section>
            <section>
              <FullPost
                selectedId={this.state.posts[this.state.selectedPost]}
              />
            </section>
            <section>
              <NewPost />
            </section>
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

export default Blog;
