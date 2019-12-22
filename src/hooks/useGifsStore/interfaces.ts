import { GifMetadata } from "../../api/GifSearchAPI";

export interface GifsStore {
  gifs: Array<GifMetadata>;
  loadedGifs: Set<string>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}
