import { Gif } from "../../api/GifSearchAPI";

export interface GifsStore {
  gifs: Array<Gif>;
  loadedGifs: Set<string>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}
