import React, { memo, useState } from "react";
import { areEqual, ListChildComponentProps } from "react-window";
import "./GifCard.scss";
import { GifMetadata } from "../../api/GifSearchAPI";
import { GifCardPlaceholder } from "./GifCardPlaceholder/GifCardPlaceholder";

export interface GifCardProps extends ListChildComponentProps {
  data: GifCardData;
}

export interface GifCardData {
  margin: number;
  width: number;
  gifs: Array<GifMetadata>;
  loadedGifs: Set<string>;
}

export const GifCard: React.FC<GifCardProps> = memo((props: GifCardProps) => {
  const {
    data: { gifs, loadedGifs, width, margin },
    style,
    index,
    isScrolling
  } = props;

  const gifCardStyle = {
    marginTop: margin,
    width
  };

  const gifMetadata = gifs[index];

  console.log(loadedGifs.has(gifMetadata?.images.original.url));
  const [hasLoadedOriginal, setHasLoadedOriginal] = useState(
    loadedGifs.has(gifMetadata?.images.original.url)
  );

  const [hasStoppedScrolling, setHasStoppedScrolling] = useState(
    !!gifMetadata && !isScrolling
  );

  if (gifMetadata === undefined) {
    return (
      <GifCardPlaceholder
        index={index}
        style={style}
        gifCardStyle={gifCardStyle}
      />
    );
  }

  if (!isScrolling && !hasStoppedScrolling) {
    setHasStoppedScrolling(true);
  }

  const {
    title,
    url,
    images: { original, still }
  }: GifMetadata = gifMetadata;

  return (
    <GifCardPlaceholder index={index} style={style} gifCardStyle={gifCardStyle}>
      <img
        className="gif"
        alt={title}
        width={width}
        height={Number(style.height) - margin}
        src={hasLoadedOriginal ? original.url : still.url}
      />
      {!hasLoadedOriginal && (
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
    </GifCardPlaceholder>
  );

  function handleLoadedGif(): void {
    setHasLoadedOriginal(true);
    // loadedGifs.add(original.url);
  }
}, areEqual);
