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
        {hasLoadedStill ? (
          <video
            className="gif"
            autoPlay
            loop
            muted
            playsInline
            width={style.width}
            height={style.height}
            poster={still.url}
          >
            <source src={original.url} type="video/mp4" />
          </video>
        ) : (
          <img
            alt={title}
            width={style.width}
            height={style.height}
            src={still.url}
            onLoad={handleLoadedStill}
          />
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
  },
  areEqual
);
