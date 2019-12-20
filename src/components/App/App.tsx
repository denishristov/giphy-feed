import React, { useState } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { SingleColumnFeed } from "../SingleColumnFeed/SingleColumnFeed";
import { GifSearchAPI } from "../../api/GifSearchAPI";

const PAGINATION: number = 40;

interface Props {
  gifSearchApi: GifSearchAPI;
}

export const App: React.FC<Props> = ({ gifSearchApi }) => {
  const gifsStore = useGifsStore(gifSearchApi, PAGINATION);
  const [searchTerm, setSearchTerm] = useState("dog");

  // useEffect(() => {
  //   gifsStore.fetchNewBatch(searchTerm);
  // }, []);

  function handleSearch(value: string): void {
    setSearchTerm(value);
    gifsStore.fetchNewBatch(value);
  }

  function handleApproachingFeedEnd(): void {
    gifsStore.fetchNextBatch(searchTerm);
  }

  return (
    <div className="app">
      <Header onSearchChange={handleSearch} data-testid="header" />
      <SingleColumnFeed
        data-testid="feed"
        feedKey={searchTerm}
        approachFeedEndDelta={PAGINATION / 2}
        gifs={gifsStore.gifs}
        loadedGifs={gifsStore.loadedGifs}
        onApproachingFeedEnd={handleApproachingFeedEnd}
      />
    </div>
  );
};
