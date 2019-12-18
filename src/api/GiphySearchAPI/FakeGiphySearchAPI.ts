import { GifMetadata } from "./interfaces";

export function FakeSearchGiphyAPI(
  searchTerm: string,
  offset: number,
  limit: number
): Promise<Array<GifMetadata>> {
  return Promise.resolve(FakeSearchGiphyAPISync(searchTerm, offset, limit));
}

export function FakeSearchGiphyAPISync(
  searchTerm: string,
  offset: number,
  limit: number
): Array<GifMetadata> {
  return Array<undefined>(limit)
    .fill(void 0)
    .map((_, i) => ({
      id: `${searchTerm}-${i + offset}`,
      title: `${searchTerm}-gif-${i + offset}`,
      url: `${searchTerm}-url-${i + offset}`,
      images: {
        original: {
          url: `${searchTerm}-url-${i + offset}`,
          mp4: `${searchTerm}-mp4-${i + offset}`,
          height: "200",
          width: "200"
        },
        fixed_width_small_still: {
          url: `${searchTerm}-url-${i + offset}`,
          height: "200",
          width: "200"
        }
      }
    }));
}
