import Axios from "axios";

export interface GifMetadata {
  title: string;
  images: {
    original: {
      url: string;
      height: string;
      width: string;
    };
    fixed_height_small_still: {
      url: string;
      height: string;
      width: string;
    };
  };
}

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

interface GiphySearchResponse {
  data: Array<GifMetadata>;
  pagination: Pagination;
  meta: Meta;
}

const baseURL = "https://api.giphy.com/v1/gifs/search";
const apiKey = process.env.REACT_APP_GIPHY_API_KEY;

const config = {
  apiKey,
  rating: "G",
  lang: "en"
};

export class GifAPI {
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

    return responseData.data;
  }
}
