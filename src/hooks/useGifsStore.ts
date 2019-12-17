import { GifMetadata, GifAPI } from "../api/GifAPI/GifAPI";
import { useMemo, useState } from "react";

const PAGINATE_BY: number = 8;

interface GifsStore {
  gifs: Array<GifMetadata>;
  fetchNewBatch(searchTerm: string): Promise<void>;
  fetchNextBatch(searchTerm: string): Promise<void>;
}

export function useGifsStore(): GifsStore {
  const api = useMemo(() => new GifAPI(), []);
  const [gifs, setGifs] = useState<Array<GifMetadata>>([]);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchNewBatch(searchTerm: string): Promise<void> {
    setGifs([]);
    setIsFetching(true);

    setGifs(await api.fetch(searchTerm, 0, PAGINATE_BY));
    setIsFetching(false);
  }

  async function fetchNextBatch(searchTerm: string): Promise<void> {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    const batch = await api.fetch(searchTerm, gifs.length, PAGINATE_BY);
    setGifs(gifs => [...gifs, ...batch]);

    setIsFetching(false);
  }

  return {
    gifs,
    fetchNewBatch,
    fetchNextBatch
  };
}
