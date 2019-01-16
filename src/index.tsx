import React from "react";
import ReactDOM from "react-dom";

import App from "./modules/app/components/App";

import {PostsProvider} from "./modules/post/store/posts";

import * as serviceWorker from "./serviceWorker";

import "./index.css";

ReactDOM.render(
  <PostsProvider subreddit="frontend">
    <App />
  </PostsProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
