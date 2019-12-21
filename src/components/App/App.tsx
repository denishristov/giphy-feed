import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { SingleColumnFeed } from "../SingleColumnFeed/SingleColumnFeed";
import { GifSearchAPI } from "../../api/GifSearchAPI";

const PAGINATION: number = 40;

const GIF_MARGIN: number = 20;

const GIF_WIDTH: number = Math.min(400, window.innerWidth - 2 * GIF_MARGIN);

const HEADER_HEIGHT: number = 82;

const FEED_HEIGHT: number = window.innerHeight - HEADER_HEIGHT;

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
      <SingleColumnFeed
        feedKey={searchTerm}
        height={FEED_HEIGHT}
        itemMargin={GIF_MARGIN}
        itemWidth={GIF_WIDTH}
        approachFeedEndDelta={PAGINATION / 2}
        gifs={gifsStore.gifs}
        loadedGifs={gifsStore.loadedGifs}
        onApproachingFeedEnd={handleApproachingFeedEnd}
      />
    </div>
  );
};
