// todo remove this dep
import { GifMetadata } from "../../api/GiphySearchAPI/interfaces";

export interface GifsStore {
  gifs: Array<GifMetadata>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}
