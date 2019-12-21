export interface GiphySearchAPIConfig {
  apiKey: string;
  rating: string;
  lang: string;
}

export interface GiphySearchResponse {
  data: Array<Gif>;
  pagination: Pagination;
}

interface Image {
  url: string;
  height: string;
  width: string;
  size: string;
}

interface Gif {
  id: string;
  title: string;
  url: string;
  images: {
    original: Image & { webp: string };
    fixed_width_small_still: Image;
  };
}

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
