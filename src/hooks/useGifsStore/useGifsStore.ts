import { useState } from "react";
import { GifMetadata } from "../../api/GifAPI/interfaces";
import { GifApi, GifsStore } from "./interfaces";

const DEFAULT_PAGINATION: number = 8;

export function useGifsStore(
  api: GifApi,
  pagination: number = DEFAULT_PAGINATION
): GifsStore {
  const [gifs, setGifs] = useState<Array<GifMetadata>>([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchNewBatch(searchTerm: string): Promise<void> {
    setGifs([]);
    setGifs(await api.fetch(searchTerm, 0, pagination));
  }

  async function fetchNextBatch(searchTerm: string): Promise<void> {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    const batch = await api.fetch(searchTerm, gifs.length, pagination);
    setGifs(gifs => [...gifs, ...batch]);

    setIsFetching(false);
  }

  return {
    gifs,
    fetchNewBatch,
    fetchNextBatch
  };
}
