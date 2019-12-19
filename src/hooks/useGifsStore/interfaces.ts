// todo remove this dep
import { Gif } from "../../api/GiphySearchAPI/interfaces";

export interface GifsStore {
  gifs: Array<Gif>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}
