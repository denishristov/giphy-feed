import React, { memo } from "react";
import { ListChildComponentProps, areEqual } from "react-window";
import { Gif } from "../../api/GiphySearchAPI/interfaces";
import "./GifCard.scss";
import { useState } from "react";

export const GIF_MARGIN: number = 20;
export const GIF_CARD_WIDTH: number = Math.min(
  440,
  window.innerWidth - 2 * GIF_MARGIN
);

export const GifCard: React.FC<ListChildComponentProps> = memo(
  ({ style, data, index, isScrolling }) => {
    const gif: Gif = data[index];

    const [hasLoaded, setHasLoaded] = useState(false);

    const src =
      isScrolling && !hasLoaded
        ? gif.images.fixed_width_small_still.url
        : gif.images.original.url;

    function handleLoad(): void {
      if (!isScrolling) {
        setHasLoaded(true);
      }
    }

    return (
      <div className="gif-wrapper" style={style} data-testid="gif">
        <div
          className="gif-card"
          style={{
            marginTop: GIF_MARGIN,
            width: GIF_CARD_WIDTH
          }}
        >
          <img
            alt={gif.title}
            width={style.width}
            height={(style.height as number) - GIF_MARGIN}
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
