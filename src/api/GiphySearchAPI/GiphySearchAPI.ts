import Axios from "axios";
import { GifSearchAPI, GifSearchAPIResponse } from "../../types/GifSearchAPI";
import { GiphySearchResponse, GiphySearchAPIConfig } from "./interfaces";

export function createGiphySearchAPI({
  webpOverGif,
  ...config
}: GiphySearchAPIConfig): GifSearchAPI {
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
            url: webpOverGif
              ? gif.images.original.webp
              : gif.images.original.url,
            height: Number(gif.images.original.height),
            width: Number(gif.images.original.width)
          },
          still: {
            url: gif.images.fixed_width_small_still.url,
            height: Number(gif.images.fixed_width_small_still.height),
            width: Number(gif.images.fixed_width_small_still.width)
          }
        }
      }));

    return {
      gifs,
      total: pagination.total_count - (data.length - gifs.length)
    };
  };
}
