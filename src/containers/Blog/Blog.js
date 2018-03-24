import React, { Component } from "react";

import "./Blog.css";
import Posts from "../Blog/Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

// Below is the code of rendering the compoenent as per the requirment
// and will not always be loaded. This is used mainly for performance purposes.
// Here NewPost component will not always be loaded in bundle.js and will only be loaded
// when clicked
import AsyncComponent from "../../hoc/asyncComponent";
var AsyncNewPost = AsyncComponent(() => {
  return import("./NewPost/NewPost");
});
// import NewPost from "../Blog/NewPost/NewPost";

// import FullPost from "./FullPost/FullPost";

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  activeClassName="active"
                  activeStyle={{
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    // pathname: this.props.match.url + "/new-post",
                    // Above is how we can use the relative path : old path + new path
                    pathname: "/new-post",
                    search: "?xyz=true",
                    hash: "#submit"
                  }}
                  activeStyle={{
                    textDecoration: "underline"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Hello</h1>} />
        <Route path="/" render={() => <h1>Hello2</h1>} /> */}
        {/* Switch finds the most appropirate match and then renders the page
        accordingly. There can be route outside the switch as well if we wlays want them to render */}
        <Switch>
          {/* By using auth here we are gaurding the url that if user is auth then only 
          he can go to this new post page. This is how we gaurd route.
          When user will click on new post it will go to "/" and then redirect 
          will redirect it to "/posts" page  */}
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />

          {/* Below is another way of handling 404 page error. below Route catches
          every page which is ot found as there is no path property defined.
          so we can route that everything to our defined component.
          This cannot be used with below redirect though as it also 
          uses path as "/" and either of 2 will work at a time in that case */}
          {/* <Route render={() => <h1> Not found</h1>} /> */}

          {/* In redirect from can only be used if u r inside 
          switch element. Else we always need to redirect to - to */}
          <Redirect from="/" to="/posts" />

          {/* <Route path="/posts" component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
