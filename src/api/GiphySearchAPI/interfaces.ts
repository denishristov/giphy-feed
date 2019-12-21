// todo clean these
export interface GiphySearchAPIConfig {
  apiKey: string;
  rating: string;
  lang: string;
}

export interface Image {
  url: string;
  height: string;
  width: string;
  size: string;
}

export interface Gif {
  id: string;
  title: string;
  url: string;
  images: {
    original: Image;
    downsized_still: Image;
    fixed_width_small_still: Image;
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

export interface GiphySearchResponse {
  data: Array<Gif>;
  pagination: Pagination;
  meta: Meta;
}
