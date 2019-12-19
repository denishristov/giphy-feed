import Axios from "axios";
import { GifSearchAPI } from "../GifSearchAPI";
import { Gif, GiphySearchResponse, GiphySearchAPIConfig } from "./interfaces";

export function createGiphySearchAPI(
  config: GiphySearchAPIConfig
): GifSearchAPI {
  const GIPHY_SEARCH_ENDPOINT: string = "https://api.giphy.com/v1/gifs/search";

  return async (
    searchTerm: string,
    offset: number,
    limit: number
  ): Promise<Array<Gif>> => {
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
      Number(gif.images.downsized_still.height)
    );
  };
}
