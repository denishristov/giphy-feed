import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import "./index.scss";
import { GiphySearchAPIConfig } from "./api/GiphySearchAPI/interfaces";
import { createGiphySearchAPI } from "./api/GiphySearchAPI/GiphySearchAPI";

const IS_USING_SAFARI_USER_AGENT = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);

const GIPHY_CONFIG: GiphySearchAPIConfig = {
  apiKey: process.env.REACT_APP_GIPHY_API_KEY!,
  rating: "G",
  lang: "en",
  webpOverGif: !IS_USING_SAFARI_USER_AGENT
};

const gifSearchApi = createGiphySearchAPI(GIPHY_CONFIG);

ReactDOM.render(
  <App gifSearchApi={gifSearchApi} />,
  document.getElementById("root")
);
