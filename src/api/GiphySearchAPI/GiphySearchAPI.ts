import Axios from "axios";
import { GifSearchAPI } from "../GifSearchAPI";
import {
  GifMetadata,
  GiphySearchResponse,
  GiphySearchAPIConfig
} from "./interfaces";

const GIPHY_SEARCH_ENDPOINT: string = "https://api.giphy.com/v1/gifs/search";

export function createGiphySearchAPI(
  config: GiphySearchAPIConfig
): GifSearchAPI {
  return async (
    searchTerm: string,
    offset: number,
    limit: number
  ): Promise<Array<GifMetadata>> => {
    const { data: responseData } = await Axios.get<GiphySearchResponse>(
      GIPHY_SEARCH_ENDPOINT,
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
  };
}
