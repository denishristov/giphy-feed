import Axios from "axios";
import { GifSearchAPI, GifSearchAPIResponse } from "../GifSearchAPI";
import { GiphySearchResponse, GiphySearchAPIConfig } from "./interfaces";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function createGiphySearchAPI(
  config: GiphySearchAPIConfig
): GifSearchAPI {
  const GIPHY_SEARCH_ENDPOINT: string = "https://api.giphy.com/v1/gifs/search";

  return async (
    searchTerm: string,
    offset: number,
    limit: number
  ): Promise<GifSearchAPIResponse> => {
    const {
      data: { data, pagination }
    } = await Axios.get<GiphySearchResponse>(GIPHY_SEARCH_ENDPOINT, {
      params: {
        q: searchTerm,
        offset,
        limit,
        ...config
      }
    });

    const gifs = data
      .filter(
        gif =>
          Number(gif.images.fixed_width_small_still.height) &&
          Number(gif.images.original.height)
      )
      .map(gif => ({
        id: gif.id,
        title: gif.title,
        url: gif.url,
        images: {
          original: {
            url: isSafari ? gif.images.original.url : gif.images.original.webp,
            height: Number(gif.images.original.height),
            width: Number(gif.images.original.width),
            size: Number(gif.images.original.size)
          },
          still: {
            url: gif.images.fixed_width_small_still.url,
            height: Number(gif.images.fixed_width_small_still.height),
            width: Number(gif.images.fixed_width_small_still.width),
            size: Number(gif.images.fixed_width_small_still.size)
          }
        }
      }));

    return {
      gifs,
      total: pagination.total_count - (data.length - gifs.length)
    };
  };
}
