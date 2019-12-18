import React, { memo } from "react";
import { ListChildComponentProps, areEqual } from "react-window";
import { GifMetadata } from "../../api/GiphySearchAPI/interfaces";
import "./GifCard.scss";

export const GIF_MARGIN: number = 20;
export const GIF_CARD_WIDTH: number = 440;

export const GifCard: React.FC<ListChildComponentProps> = memo(
  ({ style, data, index }) => {
    const gif: GifMetadata = data[index];

    return (
      <div className="gif-card" style={style} role="gif">
        <div
          className="gif-wrapper"
          style={{ marginTop: GIF_MARGIN, width: GIF_CARD_WIDTH }}
        >
          <img alt={gif.title} src={gif.images.fixed_width_small_still.url} />
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
