export interface GifMetadata {
  id: string;
  title: string;
  url: string;
  images: {
    original: {
      url: string;
      height: string;
      width: string;
    };
    fixed_width_small_still: {
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

export interface GiphySearchResponse {
  data: Array<GifMetadata>;
  pagination: Pagination;
  meta: Meta;
}
