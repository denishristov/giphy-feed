export type GifSearchAPI = (
  searchTerm: string,
  offset: number,
  limit: number
) => Promise<GifSearchAPIResponse>;

export interface GifSearchAPIResponse {
  gifs: Array<Gif>;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
  size: number;
}

export interface Gif {
  id: string;
  title: string;
  url: string;
  images: {
    original: Image;
    still: Image;
  };
}
