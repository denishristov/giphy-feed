import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { SingleColumnFeed } from "../SingleColumnFeed/SingleColumnFeed";
import { createGiphySearchAPI } from "../../api/GiphySearchAPI/GiphySearchAPI";
import { GiphySearchAPIConfig } from "../../api/GiphySearchAPI/interfaces";

const PAGINATION: number = 20;

const GIPHY_CONFIG: GiphySearchAPIConfig = {
  apiKey: process.env.REACT_APP_GIPHY_API_KEY!,
  rating: "G",
  lang: "en"
};

const gifApi = createGiphySearchAPI(GIPHY_CONFIG);

const App: React.FC = () => {
  const gifsStore = useGifsStore(gifApi, PAGINATION);
  const [searchTerm, setSearchTerm] = useState("kittens");

  useEffect(() => {
    gifsStore.fetchNewBatch(searchTerm);
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
        approachFeedEndDelta={PAGINATION / 2}
        gifs={gifsStore.gifs}
        onApproachingFeedEnd={handleApproachingFeedEnd}
      />
    </div>
  );
};

export default App;
