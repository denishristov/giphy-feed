import React, { memo } from "react";
import { ListChildComponentProps, areEqual } from "react-window";
import { GifMetadata } from "../../api/GiphySearchAPI/interfaces";
import "./GifCard.scss";

const TOP_BOTTOM_MARGIN: number = 20;
export const GIF_CARD_WIDTH: number = 440;

export const GifCard: React.FC<ListChildComponentProps> = memo(
  ({ style, data, index }) => {
    const gif: GifMetadata = data[index];

    const marginalizedStyle = {
      ...style,
      top:
        typeof style.top === "number"
          ? style.top + TOP_BOTTOM_MARGIN
          : style.top,
      height:
        typeof style.height === "number"
          ? style.height - TOP_BOTTOM_MARGIN
          : style.height
    };

    return (
      <div className="gif-card" style={marginalizedStyle}>
        <div className="gif-wrapper">
          <img alt={gif.title} src={gif.images.fixed_width_small_still.url} />
          {gif.title && (
            <a className="gif-link" href={gif.url}>
              {gif.title}
            </a>
          )}
        </div>
      </div>
    );
  },
  areEqual
);
