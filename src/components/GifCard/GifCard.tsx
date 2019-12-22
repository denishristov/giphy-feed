import React, { memo, useState } from "react";
import { areEqual, ListChildComponentProps } from "react-window";
import { GifMetadata } from "../../types/GifSearchAPI";
import { GifCardPlaceholder } from "./GifCardPlaceholder/GifCardPlaceholder";
import "./GifCard.scss";

export interface GifCardProps extends ListChildComponentProps {
  data: GifCardData;
}

export interface GifCardData {
  margin: number;
  width: number;
  gifs: Array<GifMetadata>;
}

export const GifCard: React.FC<GifCardProps> = memo((props: GifCardProps) => {
  const {
    data: { gifs, width, margin },
    style,
    index,
    isScrolling
  } = props;

  const gifCardStyle = {
    marginTop: margin,
    width
  };

  const gifMetadata = gifs[index];

  const [hasLoadedOriginal, setHasLoadedOriginal] = useState(false);
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

  /* We only care about scrolling if we have the metadata to render. */
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
      {hasStoppedScrolling && !hasLoadedOriginal && (
        <img
          className="dummy"
          alt={title}
          src={original.url}
          onLoad={handleLoadedOriginal}
        />
      )}
      {title && (
        <div className="gif-link">
          <a href={url}>{title}</a>
        </div>
      )}
    </GifCardPlaceholder>
  );

  function handleLoadedOriginal(): void {
    setHasLoadedOriginal(true);
  }
}, areEqual);
