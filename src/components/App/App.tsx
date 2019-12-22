import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { GifSearchAPI } from "../../api/GifSearchAPI";
import { GridFeed } from "../GridFeed/GridFeed";

const PAGINATION: number = 300;

const GIF_MARGIN: number = 20;

const GIF_MAX_WIDTH: number = 400;

const HEADER_HEIGHT: number = 82;

const FEED_HEIGHT: number = window.innerHeight;

const ITEMS_PER_ROW: number = 3;

interface Props {
  gifSearchApi: GifSearchAPI;
}

export const App: React.FC<Props> = ({ gifSearchApi }) => {
  const gifsStore = useGifsStore(gifSearchApi, PAGINATION);
  const [searchTerm, setSearchTerm] = useState("dog");

  useEffect(() => {
    gifsStore.fetchNewBatch(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(value: string): void {
    setSearchTerm(value);
    gifsStore.fetchNewBatch(value);
  }

  function handleApproachingFeedEnd(): void {
    gifsStore.fetchNextBatch(searchTerm);
  }

  return (
    <div className="app">
      <Header onSearchChange={handleSearch} />
      <GridFeed
        feedKey={searchTerm}
        top={HEADER_HEIGHT}
        height={FEED_HEIGHT}
        maxItemsPerRow={ITEMS_PER_ROW}
        itemMargin={GIF_MARGIN}
        maxItemSize={GIF_MAX_WIDTH}
        approachFeedEndDelta={PAGINATION / 2}
        gifs={gifsStore.gifs}
        loadedGifs={gifsStore.loadedGifs}
        onApproachingFeedEnd={handleApproachingFeedEnd}
      />
    </div>
  );
};
