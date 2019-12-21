import { Gif, Image } from "./interfaces";

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
      url: FakeURL("post", searchTerm, i + offset),
      images: {
        original: FakeImage("original", searchTerm, i + offset),
        downsized_still: FakeImage("medium", searchTerm, i + offset),
        fixed_width_small_still: FakeImage("small", searchTerm, i + offset)
      }
    }));
}

function FakeImage(key: string, searchTerm: string, index: number): Image {
  return {
    url: FakeURL(key, searchTerm, index),
    size: "3400",
    height: "200",
    width: "200"
  };
}

function FakeURL(
  key: string,
  searchTerm: string,
  index: number,
  suffix: string = "gif"
): string {
  return `https://www.fake.com/${key}-${searchTerm}-${index}.${suffix}`;
}
