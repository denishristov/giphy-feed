import React, { memo, useState, useEffect } from "react";
import { areEqual, ListChildComponentProps } from "react-window";
import { GifMetadata } from "../../types/GifSearchAPI";
import { GifCardPlaceholder } from "./GifCardPlaceholder/GifCardPlaceholder";
import "./GifCard.scss";

interface GifCardProps extends ListChildComponentProps {
  data: Array<GifMetadata>;
}

export const GifCard: React.FC<GifCardProps> = memo(
  ({ data, style, index, isScrolling }: GifCardProps) => {
    const gifMetadata: GifMetadata | undefined = data[index];

    const [hasLoadedOriginal, setHasLoadedOriginal] = useState(false);

    /* We only care about scrolling if we have the metadata to render. */
    const [hasStoppedScrolling, setHasStoppedScrolling] = useState(
      !!gifMetadata && !isScrolling
    );

    useEffect(() => {
      if (gifMetadata !== undefined && !isScrolling && !hasStoppedScrolling) {
        setHasStoppedScrolling(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gifMetadata, isScrolling]);

    if (gifMetadata === undefined) {
      return <GifCardPlaceholder index={index} style={style} />;
    }

    const {
      title,
      url,
      images: { original, still }
    } = gifMetadata;

    return (
      <GifCardPlaceholder index={index} style={style}>
        <img
          className="gif"
          alt={title}
          width={style.width}
          height={style.height}
          src={hasLoadedOriginal ? original.url : still.url}
        />
        {hasStoppedScrolling && !hasLoadedOriginal && (
          <img
            className="background-fetcher"
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
  },
  areEqual
);
