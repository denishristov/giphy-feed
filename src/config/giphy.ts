import { GiphySearchAPIConfig } from "../api/GiphySearchAPI/interfaces";

if (!process.env.REACT_APP_GIPHY_API_KEY) {
  throw new Error(
    'Please provide a GIPHY API key in .env under the key "REACT_APP_GIPHY_API_KEY".'
  );
}

const IS_USING_SAFARI_USER_AGENT = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);

export const GIPHY_CONFIG: GiphySearchAPIConfig = {
  apiKey: process.env.REACT_APP_GIPHY_API_KEY,
  rating: "G",
  lang: "en",
  /* Unfortunately, Safari does not yet support webp format. */
  webpOverGif: !IS_USING_SAFARI_USER_AGENT
};
