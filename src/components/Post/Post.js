import React from "react";
// import { withRouter } from "react-router-dom";
// This is how we can access the route related props in this container

import "./Post.css";

const post = props => {
  return (
    <article className="Post" onClick={props.Clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

// export default withRouter(post);
export default post;
