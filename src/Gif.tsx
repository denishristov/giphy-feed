import React from "react";
import { ListChildComponentProps } from "react-window";
import { GifMetadata } from "./GifAPI";

export const Gif: React.FC<ListChildComponentProps> = ({
  style,
  data,
  index
}) => {
  const gif: GifMetadata = data[index];
  return <img alt={gif.title} src={gif.images.original.url} style={style} />;
};
