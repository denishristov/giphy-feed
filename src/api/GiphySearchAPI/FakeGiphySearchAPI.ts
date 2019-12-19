import { Gif } from "./interfaces";

export function FakeSearchGiphyAPI(
  searchTerm: string,
  offset: number,
  limit: number
): Promise<Array<Gif>> {
  return Promise.resolve(FakeSearchGiphyAPISync(searchTerm, offset, limit));
}

export function FakeSearchGiphyAPISync(
  searchTerm: string,
  offset: number,
  limit: number
): Array<Gif> {
  return Array<undefined>(limit)
    .fill(void 0)
    .map((_, i) => ({
      id: `${searchTerm}-${i + offset}`,
      title: `${searchTerm}-gif-${i + offset}`,
      url: `${searchTerm}-url-${i + offset}`,
      images: {
        original: {
          url: `${searchTerm}-url-${i + offset}`,
          size: "3400",
          height: "200",
          width: "200"
        },
        downsized_still: {
          url: `${searchTerm}-url-${i + offset}`,
          height: "200",
          size: "3400",
          width: "200"
        },
        fixed_width_small_still: {
          url: `${searchTerm}-url-${i + offset}`,
          size: "3400",
          height: "200",
          width: "200"
        }
      }
    }));
}
