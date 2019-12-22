import { useState } from "react";
import { GifsStore } from "./interfaces";
import { GifSearchAPI, GifMetadata } from "../../api/GifSearchAPI";

export function useGifsStore(
  search: GifSearchAPI,
  pagination: number
): GifsStore {
  const [gifs, setGifs] = useState<Array<GifMetadata>>([]);
  const [total, setTotal] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchNewBatch(searchTerm: string): Promise<void> {
    setGifs([]);
    const { gifs, total } = await search(searchTerm, 0, pagination);
    setGifs(gifs);
    setTotal(total);
  }

  async function fetchNextBatch(searchTerm: string): Promise<void> {
    if (isFetching || gifs.length === total) {
      return;
    }

    setIsFetching(true);

    const batch = await search(searchTerm, gifs.length, pagination);

    setGifs(gifs => [...gifs, ...batch.gifs]);

    setIsFetching(false);

    if (total !== batch.total) {
      setTotal(batch.total);
    }
  }

  return {
    gifs,
    fetchNewBatch,
    fetchNextBatch
  };
}
