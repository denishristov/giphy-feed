// todo remove this dep
import { Gif } from "./GiphySearchAPI/interfaces";

export type GifSearchAPI = (
  searchTerm: string,
  offset: number,
  limit: number
) => Promise<Array<Gif>>;
