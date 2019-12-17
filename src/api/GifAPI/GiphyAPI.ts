import Axios from "axios";
import { GifMetadata, GiphySearchResponse } from "./interfaces";

const baseURL = "https://api.giphy.com/v1/gifs/search";
const apiKey = process.env.REACT_APP_GIPHY_API_KEY;

const config = {
  apiKey,
  rating: "G",
  lang: "en"
};

export class GiphyAPI {
  async fetch(
    searchTerm: string,
    offset: number,
    limit: number
  ): Promise<Array<GifMetadata>> {
    const { data: responseData } = await Axios.get<GiphySearchResponse>(
      baseURL,
      {
        params: {
          q: searchTerm,
          offset,
          limit,
          ...config
        }
      }
    );

    return responseData.data.filter(gif =>
      Number(gif.images.fixed_width_small_still.height)
    );
  }
}
