import { useState } from "react";
import { Gif } from "../../api/GiphySearchAPI/interfaces";
import { GifsStore } from "./interfaces";
import { GifSearchAPI } from "../../api/GifSearchAPI";

export function useGifsStore(
  search: GifSearchAPI,
  pagination: number
): GifsStore {
  const [gifs, setGifs] = useState<Array<Gif>>([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchNewBatch(searchTerm: string): Promise<void> {
    setGifs([]);
    setGifs(await search(searchTerm, 0, pagination));
  }

  async function fetchNextBatch(searchTerm: string): Promise<void> {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    const batch = await search(searchTerm, gifs.length, pagination);
    setGifs(gifs => [...gifs, ...batch]);

    setIsFetching(false);
  }

  return {
    gifs,
    fetchNewBatch,
    fetchNextBatch
  };
}
