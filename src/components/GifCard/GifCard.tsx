import React, { memo, useState, CSSProperties, ReactNode } from "react";
import { areEqual } from "react-window";
import { ListFeedItemProps } from "../ListFeed/ListFeedItemProps";
import "./GifCard.scss";
import { GifMetadata } from "../../api/GifSearchAPI";

interface GifPlaceholderProps {
  index: number;
  style: CSSProperties;
  gifCardStyle: CSSProperties;
  children?: ReactNode;
}

export const GifCard: React.FC<ListFeedItemProps> = memo(
  (props: ListFeedItemProps) => {
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

    const [hasLoadedOriginal, setHasLoadedOriginal] = useState(
      loadedGifs.has(gifMetadata?.images.original.url)
    );

    const [hasStoppedScrolling, setHasStoppedScrolling] = useState(
      gifMetadata && !isScrolling
    );

    if (gifMetadata === undefined) {
      return (
        <GifPlaceholder
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
      <GifPlaceholder index={index} style={style} gifCardStyle={gifCardStyle}>
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
      </GifPlaceholder>
    );

    function handleLoadedGif(): void {
      setHasLoadedOriginal(true);
      loadedGifs.add(original.url);
    }
  },
  areEqual
);

export const GifPlaceholder: React.FC<GifPlaceholderProps> = ({
  index,
  style,
  gifCardStyle,
  children
}) => (
  <div className="gif-wrapper" style={style}>
    <div className="gif-card" style={gifCardStyle}>
      <h1># {index + 1}</h1>
      {children}
    </div>
  </div>
);
