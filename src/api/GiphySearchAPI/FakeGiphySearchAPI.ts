import { ImageMetadata, GifSearchAPIResponse } from "../../types/GifSearchAPI";

export function FakeSearchGiphyAPI(
  searchTerm: string,
  offset: number,
  limit: number
): Promise<GifSearchAPIResponse> {
  return Promise.resolve(FakeSearchGiphyAPISync(searchTerm, offset, limit));
}

export function FakeSearchGiphyAPISync(
  searchTerm: string,
  offset: number,
  limit: number
): GifSearchAPIResponse {
  return {
    gifs: Array<undefined>(limit)
      .fill(void 0)
      .map((_, i) => ({
        id: `${searchTerm}-${i + offset}`,
        title: `${searchTerm}-gif-${i + offset}`,
        url: FakeURL("post", searchTerm, i + offset),
        images: {
          original: FakeImage("original", searchTerm, i + offset),
          still: FakeImage("small", searchTerm, i + offset)
        }
      })),
    total: 100
  };
}

function FakeImage(
  key: string,
  searchTerm: string,
  index: number
): ImageMetadata {
  return {
    url: FakeURL(key, searchTerm, index),
    height: 200,
    width: 200
  };
}

function FakeURL(
  key: string,
  searchTerm: string,
  index: number,
  suffix: string = "gif"
): string {
  return `https://www.giphy-fake-api.com/${key}-${searchTerm}-${index}.${suffix}`;
}
