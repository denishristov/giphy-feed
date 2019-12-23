import { GiphySearchAPIConfig } from "../api/GiphySearchAPI/interfaces";

if (!process.env.REACT_APP_GIPHY_API_KEY) {
  throw new Error(
    'Please provide a GIPHY API key in .env under the key "REACT_APP_GIPHY_API_KEY".'
  );
}

export const GIPHY_CONFIG: GiphySearchAPIConfig = {
  apiKey: process.env.REACT_APP_GIPHY_API_KEY,
  rating: "G",
  lang: "en"
};
