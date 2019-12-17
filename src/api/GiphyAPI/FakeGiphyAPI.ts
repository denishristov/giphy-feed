import { GifMetadata } from "./interfaces";

export class FakeGiphyAPI {
  fetch(
    searchTerm: string,
    offset: number,
    limit: number
  ): Promise<Array<GifMetadata>> {
    return Promise.resolve(
      Array<undefined>(limit)
        .fill(void 0)
        .map((_, i) => ({
          id: `${searchTerm}-${i + offset}`,
          title: `${searchTerm}-gif-${i + offset}`,
          url: `${searchTerm}-url-${i + offset}`,
          images: {
            original: {
              url: `${searchTerm}-url-${i + offset}`,
              height: `${i * 10}`,
              width: `${i * 10}`
            },
            fixed_width_small_still: {
              url: `${searchTerm}-url-${i + offset}`,
              height: `${i * 10}`,
              width: `${i * 10}`
            }
          }
        }))
    );
  }
}
