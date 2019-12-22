export type GifSearchAPI = (
  searchTerm: string,
  offset: number,
  limit: number
) => Promise<GifSearchAPIResponse>;

export interface GifSearchAPIResponse {
  gifs: Array<GifMetadata>;
  total: number;
}

export interface ImageMetadata {
  url: string;
  height: number;
  width: number;
}

export interface GifMetadata {
  id: string;
  title: string;
  url: string;
  images: {
    original: ImageMetadata;
    still: ImageMetadata;
  };
}
