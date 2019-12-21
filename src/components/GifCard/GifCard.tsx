import React, { memo, useState } from "react";
import { areEqual } from "react-window";
import { Gif } from "../../api/GifSearchAPI";
import { SingleColumnFeedItemProps } from "../SingleColumnFeed/SingleColumnFeedItemProps";
import "./GifCard.scss";

export const GifCard: React.FC<SingleColumnFeedItemProps> = memo(
  ({ style, data, index, isScrolling }: SingleColumnFeedItemProps) => {
    const { gifs, loadedGifs, width, margin } = data;
    const {
      title,
      url,
      images: { original, still }
    }: Gif = gifs[index];

    const gifCardStyle = {
      marginTop: margin,
      width
    };

    const [hasLoadedOriginal, setHasLoadedOriginal] = useState(
      loadedGifs.has(original.url)
    );

    const [hasStoppedScrolling, setHasStoppedScrolling] = useState(
      !isScrolling
    );

    if (!isScrolling && !hasStoppedScrolling) {
      setHasStoppedScrolling(true);
    }

    function handleLoadedGif(): void {
      setHasLoadedOriginal(true);
      loadedGifs.add(original.url);
    }

    return (
      <div className="gif-wrapper" style={style}>
        <div className="gif-card" style={gifCardStyle}>
          <img
            className="gif"
            alt={title}
            width={width}
            height={Number(style.height) - margin}
            src={hasLoadedOriginal ? original.url : still.url}
          />
          {hasStoppedScrolling && !hasLoadedOriginal && (
            <img
              className="dummy"
              alt={title}
              src={original.url}
              onLoad={handleLoadedGif}
            />
          )}
          {title && (
            <div className="gif-link">
              <a href={url}>{title}</a>
            </div>
          )}
        </div>
      </div>
    );
  },
  areEqual
);
