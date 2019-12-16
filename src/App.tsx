import React, { useState, useEffect } from "react";
import "./App.scss";
import { GifAPI, GifMetadata } from "./GifAPI";
import { VariableSizeList } from "react-window";
import { Gif, GIF_CARD_WIDTH } from "./Gif";
import { Header } from "./Header";

const api = new GifAPI();

const App: React.FC = () => {
  const [gifs, setGifs] = useState<Array<GifMetadata>>([]);

  useEffect(() => {
    api.fetch("kitties", 0, 100).then(setGifs);
  }, []);

  function handleSearch(value: string): void {
    setGifs([]);
    api.fetch(value, 0, 100).then(setGifs);
  }

  function calculateItemHeight(index: number) {
    const { width, height } = gifs[index].images.fixed_height_small_still;
    const originalWidth = Number(width);
    const originalHeight = Number(height);

    return (originalHeight * GIF_CARD_WIDTH) / originalWidth;
  }

  return (
    <div className="app">
      <Header onSearchChange={handleSearch} />
      <VariableSizeList
        itemData={gifs}
        height={window.innerHeight - 84}
        itemCount={gifs.length}
        itemSize={calculateItemHeight}
        width={window.innerWidth}
      >
        {Gif}
      </VariableSizeList>
    </div>
  );
};

export default App;
