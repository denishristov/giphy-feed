import { GifMetadata } from "../../types/GifSearchAPI";

export interface GifsStore {
  gifs: Array<GifMetadata>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}
