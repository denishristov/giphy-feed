import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import { GifAPI, GifMetadata } from "./GifAPI";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { GifCard, GIF_CARD_WIDTH } from "./GifCard";
import { Header } from "./Header";
import { debounce } from "debounce";

const api = new GifAPI();

const PAGINATE_BY: number = 8;

const App: React.FC = () => {
  const [gifs, setGifs] = useState<Array<GifMetadata>>([]);
  const [searchTerm, setSearchTerm] = useState("kittens");
  const [isFetching, setIsFetching] = useState(false);
  const listRef = useRef<VariableSizeList | null>(null);

  useEffect(() => {
    api.fetch(searchTerm, 0, PAGINATE_BY).then(setGifs);
  }, []);

  async function handleSearch(value: string): Promise<void> {
    setSearchTerm(value);

    setGifs([]);
    setIsFetching(true);

    setGifs(await api.fetch(value, 0, PAGINATE_BY));
    setIsFetching(false);

    listRef.current?.resetAfterIndex(0, true);
  }

  function calculateItemHeight(index: number) {
    const gif = gifs[index];

    const { width, height } = gif.images.fixed_width_small_still;
    const originalWidth = Number(width);
    const originalHeight = Number(height);

    return Math.round((originalHeight * GIF_CARD_WIDTH) / originalWidth);
  }

  function getItemKey(index: number, data: Array<GifMetadata>): string {
    return data[index].images.fixed_width_small_still.url;
  }

  async function handleItemsRendered({
    overscanStopIndex
  }: ListOnItemsRenderedProps): Promise<void> {
    if (!isFetching && overscanStopIndex + 4 >= gifs.length) {
      setIsFetching(true);

      const batch = await api.fetch(searchTerm, gifs.length, PAGINATE_BY);
      setGifs(gifs => [...gifs, ...batch]);

      setIsFetching(false);
    }
  }

  return (
    <div className="app">
      <Header onSearchChange={debounce(handleSearch, 300)} />
      <VariableSizeList
        ref={listRef}
        itemData={gifs}
        height={window.innerHeight - 82}
        itemCount={gifs.length}
        itemSize={calculateItemHeight}
        itemKey={getItemKey}
        width={window.innerWidth}
        onItemsRendered={handleItemsRendered}
      >
        {GifCard}
      </VariableSizeList>
    </div>
  );
};

export default App;
