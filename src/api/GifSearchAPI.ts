// todo remove this dep
import { GifMetadata } from "./GiphySearchAPI/interfaces";

export type GifSearchAPI = (
  searchTerm: string,
  offset: number,
  limit: number
) => Promise<Array<GifMetadata>>;
