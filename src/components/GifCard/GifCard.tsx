import React, { memo } from "react";
import { ListChildComponentProps, areEqual } from "react-window";
import { GifMetadata } from "../../api/GiphySearchAPI/interfaces";
import "./GifCard.scss";

export const GIF_MARGIN: number = 20;
export const GIF_CARD_WIDTH: number = 440;

export const GifCard: React.FC<ListChildComponentProps> = memo(
  ({ style, data, index }) => {
    const gif: GifMetadata = data[index];

    return (
      <div className="gif-wrapper" style={style} data-testid="gif">
        <div
          className="gif-card"
          style={{
            marginTop: GIF_MARGIN,
            width: GIF_CARD_WIDTH
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsinline
            width={style.width}
            height={(style.height as number) - GIF_MARGIN}
            src={gif.images.original.mp4}
            poster={gif.images.fixed_width_small_still.url}
          />
          {gif.title && (
            <div className="gif-link">
              <a href={gif.url}>{gif.title}</a>
            </div>
          )}
        </div>
      </div>
    );
  },
  areEqual
);
