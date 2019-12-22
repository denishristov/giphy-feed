import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { GifSearchAPI } from "../../api/GifSearchAPI";
import { GridFeed, GridFeedProps } from "../GridFeed/GridFeed";
import { useWindowSize } from "../../hooks/useWindowSize/useWindowSize";
import { ListFeed, ListFeedProps } from "../ListFeed/ListFeed";
import { INITIAL_SEARCH_TERM, LIST_VIEW_THRESHOLD } from "./UIConfig";
import {
  PAGINATION,
  GIF_MAX_WIDTH,
  GIF_MARGIN,
  HEADER_HEIGHT,
  MAX_ITEMS_PER_ROW
} from "./UIConfig";

interface AppProps {
  gifSearchApi: GifSearchAPI;
}

type FeedCommonProps = Omit<ListFeedProps, "itemWidth"> &
  Omit<GridFeedProps, "itemSize" | "maxItemsPerRow" | "placeholdersCount">;

export const App: React.FC<AppProps> = ({ gifSearchApi }) => {
  const { width, height } = useWindowSize();
  const gifsStore = useGifsStore(gifSearchApi, PAGINATION);
  const [searchTerm, setSearchTerm] = useState(INITIAL_SEARCH_TERM);

  const itemWidth = Math.min(GIF_MAX_WIDTH, width - 2 * GIF_MARGIN);

  const commonProps: FeedCommonProps = {
    feedKey: searchTerm,
    width: width,
    height: height,
    itemTop: HEADER_HEIGHT,
    itemMargin: GIF_MARGIN,
    approachFeedEndDelta: PAGINATION / 2,
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
        <ListFeed itemWidth={itemWidth} {...commonProps} />
      ) : (
        <GridFeed
          itemSize={itemWidth}
          placeholdersCount={PAGINATION / 2}
          maxItemsPerRow={MAX_ITEMS_PER_ROW}
          {...commonProps}
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
