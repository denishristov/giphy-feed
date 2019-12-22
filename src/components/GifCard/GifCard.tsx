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
