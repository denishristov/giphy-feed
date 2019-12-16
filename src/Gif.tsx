import React from "react";
import { ListChildComponentProps } from "react-window";
import { GifMetadata } from "./GifAPI";
import "./Gif.scss";

const TOP_BOTTOM_MARGIN: number = 20;

export const GIF_CARD_WIDTH: number = 440;

export const Gif: React.FC<ListChildComponentProps> = ({
  style,
  data,
  index
}) => {
  const gif: GifMetadata = data[index];
  const marginalizedStyle = {
    ...style,
    top: (style.top as number) + TOP_BOTTOM_MARGIN,
    height: (style.height as number) - TOP_BOTTOM_MARGIN
  };

  return (
    <div className="gif-card" style={marginalizedStyle}>
      <img alt={gif.title} src={gif.images.fixed_height_small_still.url} />
    </div>
  );
};
