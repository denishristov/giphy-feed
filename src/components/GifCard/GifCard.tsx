import React, { memo, useState } from "react";
import { areEqual, ListChildComponentProps } from "react-window";
import { GifMetadata } from "../../types/GifSearchAPI";
import { GifCardPlaceholder } from "./GifCardPlaceholder/GifCardPlaceholder";
import "./GifCard.scss";

interface GifCardProps extends ListChildComponentProps {
  data: Array<GifMetadata>;
}

export const GifCard: React.FC<GifCardProps> = memo(
  ({ data, style, index }: GifCardProps) => {
    const [hasLoadedStill, setHasLoadedStill] = useState(false);
    const [hasLoadedOriginal, setHasLoadedOriginal] = useState(false);

    const gifMetadata: GifMetadata | undefined = data[index];

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
        {!hasLoadedOriginal && (
          <img
            className="gif"
            alt={title}
            width={style.width}
            height={style.height}
            src={still.url}
            onLoad={handleLoadedStill}
          />
        )}
        {hasLoadedStill && (
          <video
            className="gif"
            autoPlay
            loop
            muted
            playsInline
            width={style.width}
            height={style.height}
            onLoadedData={handleLoadedOriginal}
          >
            <source
              src={original.url}
              type="video/mp4"
              onLoad={handleLoadedOriginal}
            />
          </video>
        )}
        {title && (
          <div className="gif-link">
            <a href={url}>{title}</a>
          </div>
        )}
      </GifCardPlaceholder>
    );

    function handleLoadedStill(): void {
      setHasLoadedStill(true);
    }

    function handleLoadedOriginal(): void {
      setHasLoadedOriginal(true);
    }
  },
  areEqual
);
