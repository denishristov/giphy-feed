import React, { useState, useEffect } from "react";
import "./App.scss";
import { Header } from "../Header/Header";
import { useGifsStore } from "../../hooks/useGifsStore";
import { SingleColumnFeed } from "../SingleColumnFeed/SingleColumnFeed";

const App: React.FC = () => {
  const gifsStore = useGifsStore();
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
