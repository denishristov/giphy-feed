import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import { createGiphySearchAPI } from "./api/GiphySearchAPI/GiphySearchAPI";
import { GIPHY_CONFIG } from "./config/giphy";
import "./index.scss";

const gifSearchApi = createGiphySearchAPI(GIPHY_CONFIG);

ReactDOM.render(
  <App gifSearchApi={gifSearchApi} />,
  document.getElementById("root")
);
