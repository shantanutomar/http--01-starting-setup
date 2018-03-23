import React, { Component } from "react";

import "./NewPost.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Shantanu",
    redirect: false
  };

  componentDidMount = () => {};

  addPostHandler = () => {
    var data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    axios.post("/posts/", data).then(Response => {
      console.log(Response);
      // This is one way to redirect by handling state and then render the
      // componenent condiotnally as done below
      // this.setState({ redirect: true });

      // This is another way of handling redirect. We use replace so that if we press back
      // button it will not go back again to New post page but will be at posts age only.
      // If we use push here, the if we click on back then new post page will be rendered again
      this.props.history.replace("/posts");
      alert("Data has been added !!");
    });
  };

  render() {
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to="/posts" />;
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Shantanu">Shantanu</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.addPostHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
