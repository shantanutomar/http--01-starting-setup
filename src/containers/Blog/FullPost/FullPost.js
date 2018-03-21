import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  deleteButtonHandler = () => {
    axios
      .delete(
        "/posts/" + this.props.selectedId.id
      )
      .then(Response => {
        console.log(Response);
        alert("Data has been deleted !!");
      });
  };
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.selectedId) {
      post = (
        <div className="FullPost">
          <h1>{this.props.selectedId.title}</h1>
          <p>{this.props.selectedId.body}</p>
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
