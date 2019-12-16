import React, { memo } from "react";
import { ListChildComponentProps, areEqual } from "react-window";
import { GifMetadata } from "./GifAPI";
import "./GifCard.scss";

const TOP_BOTTOM_MARGIN: number = 20;

export const GIF_CARD_WIDTH: number = 440;

export const GifCard: React.FC<ListChildComponentProps> = memo(
  ({ style, data, index }) => {
    const gif: GifMetadata = data[index];

    const marginalizedStyle = {
      ...style,
      top: (style.top as number) + TOP_BOTTOM_MARGIN,
      height: (style.height as number) - TOP_BOTTOM_MARGIN
    };

    return (
      <div className="gif-card" style={marginalizedStyle}>
        <div className="gif-wrapper">
          <img alt={gif.title} src={gif.images.fixed_width_small_still.url} />
          {gif.title && <label>{gif.title}</label>}
        </div>
      </div>
    );
  },
  areEqual
);
