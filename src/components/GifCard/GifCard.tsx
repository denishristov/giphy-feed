import React, { memo, useState } from "react";
import { areEqual } from "react-window";
import { Gif } from "../../api/GiphySearchAPI/interfaces";
import { SingleColumnFeedItemProps } from "../SingleColumnFeed/SingleColumnFeedItemProps";
import "./GifCard.scss";

export const GifCard: React.FC<SingleColumnFeedItemProps> = memo(
  ({ style, data, index, isScrolling }: SingleColumnFeedItemProps) => {
    const { gifs, loadedGifs, width, margin } = data;
    const gif: Gif = gifs[index];

    const [hasLoadedGif, setHasLoadedGif] = useState(
      loadedGifs.has(gif.images.original.url)
    );

    const gifCardStyle = {
      marginTop: margin,
      width
    };

    const src =
      !hasLoadedGif && isScrolling
        ? gif.images.fixed_width_small_still.url
        : gif.images.original.url;

    function handleLoad(): void {
      if (!isScrolling && !hasLoadedGif) {
        loadedGifs.add(gif.images.original.url);
        setHasLoadedGif(true);
      }
    }

    return (
      <div className="gif-wrapper" style={style}>
        <div className="gif-card" style={gifCardStyle}>
          <img
            alt={gif.title}
            width={width}
            height={Number(style.height) - margin}
            src={src}
            onLoad={handleLoad}
          />
          {gif.title && (
            <div className="gif-link">
              <a href={gif.url}>{gif.title}</a>
            </div>
          )}
        </div>
      </div>
    );
  },
  areEqual
);
