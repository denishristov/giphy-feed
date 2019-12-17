// todo remove this dep
import { GifMetadata } from "../../api/GiphyAPI/interfaces";

export interface GifsStore {
  gifs: Array<GifMetadata>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}

export interface GifApi {
  fetch(
    searchTerm: string,
    offset: number,
    limit: number
  ): Promise<Array<GifMetadata>>;
}
