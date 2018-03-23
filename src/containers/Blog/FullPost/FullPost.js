import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };
  deleteButtonHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then(Response => {
      console.log(Response);
      alert("Data has been deleted !!");
    });
  };

  componentDidMount = () => {
    this.loadData();
  };

  componentDidUpdate = () => {
    this.loadData();
  };

  loadData = () => {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== Number(this.props.match.params.id))
      ) {
        axios
          .get("/posts/" + this.props.match.params.id)
          .then(Response => {
            this.setState({ loadedPost: Response.data });
          })
          .catch(error => {
            console.log(error);
            this.setState({ loadedPost: null });
          });
      }
    }
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deleteButtonHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
