import React, { useState, useEffect, useMemo } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore/useGifsStore";
import { SingleColumnFeed } from "../SingleColumnFeed/SingleColumnFeed";
import { GiphyAPI } from "../../api/GifAPI/GiphyAPI";

const App: React.FC = () => {
  const api = useMemo(() => new GiphyAPI(), []);
  const gifsStore = useGifsStore(api);
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
        gifs={gifsStore.gifs}
        onApproachingFeedEnd={handleApproachingFeedEnd}
      />
    </div>
  );
};

export default App;
