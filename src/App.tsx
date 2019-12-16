import React, { useState, useEffect } from "react";
import "./App.scss";
import { GifAPI, GifMetadata } from "./GifAPI";
import { VariableSizeList } from "react-window";
import { Gif } from "./Gif";

const api = new GifAPI();

const App: React.FC = () => {
  const [gifs, setGifs] = useState<Array<GifMetadata>>([]);

  useEffect(() => {
    api.fetch("kitties", 0, 100).then(setGifs);
  }, []);

  return (
    <div className="app">
      <VariableSizeList
        itemData={gifs}
        height={window.innerHeight}
        itemCount={gifs.length}
        itemSize={(index: number) => Number(gifs[index].images.original.height)}
        width={300}
      >
        {Gif}
      </VariableSizeList>
    </div>
  );
};

export default App;
