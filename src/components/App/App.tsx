import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { GifSearchAPI } from "../../types/GifSearchAPI";
import { GridFeed } from "../GridFeed/GridFeed";
import { useWindowSize } from "../../hooks/useWindowSize/useWindowSize";
import { ListFeed } from "../ListFeed/ListFeed";
import { FeedProps } from "../../types/FeedProps";
import {
  PAGINATION_OFFSET,
  GIF_MAX_WIDTH,
  GIF_MARGIN,
  HEADER_HEIGHT,
  MAX_ITEMS_PER_ROW,
  INITIAL_SEARCH_TERM,
  LIST_VIEW_THRESHOLD
} from "./UIConfig";

interface AppProps {
  gifSearchApi: GifSearchAPI;
}

export const App: React.FC<AppProps> = ({ gifSearchApi }) => {
  const { width, height } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState(INITIAL_SEARCH_TERM);
  const gifsStore = useGifsStore(gifSearchApi, PAGINATION_OFFSET);

  const itemWidth = Math.min(GIF_MAX_WIDTH, width - 2 * GIF_MARGIN);

  const feedProps: FeedProps = {
    feedKey: searchTerm,
    width: width,
    height: height,
    itemTop: HEADER_HEIGHT,
    itemWidth,
    itemMargin: GIF_MARGIN,
    approachFeedEndDelta: PAGINATION_OFFSET / 2,
    gifs: gifsStore.gifs,
    onApproachingFeedEnd: handleApproachingFeedEnd
  };

  useEffect(() => {
    gifsStore.fetchNewBatch(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header height={HEADER_HEIGHT} onSearchChange={handleSearch} />
      {width < LIST_VIEW_THRESHOLD ? (
        <ListFeed {...feedProps} />
      ) : (
        <GridFeed
          placeholdersCount={PAGINATION_OFFSET}
          maxItemsPerRow={MAX_ITEMS_PER_ROW}
          {...feedProps}
        />
      )}
    </div>
  );

  function handleSearch(value: string): void {
    setSearchTerm(value);
    gifsStore.fetchNewBatch(value);
  }

  function handleApproachingFeedEnd(): void {
    gifsStore.fetchNextBatch(searchTerm);
  }
};
