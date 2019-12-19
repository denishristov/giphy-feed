import React, { memo, useState } from "react";
import { ListChildComponentProps, areEqual } from "react-window";
import { Gif } from "../../api/GiphySearchAPI/interfaces";
import "./GifCard.scss";

export const GIF_MARGIN: number = 20;

const GIF_MIN_WIDTH: number = 400 + 2 * GIF_MARGIN;

export const GIF_CARD_WIDTH: number = Math.min(
  GIF_MIN_WIDTH,
  window.innerWidth - 2 * GIF_MARGIN
);

interface Props extends ListChildComponentProps {
  data: { gifs: Array<Gif>; loadedGifs: Set<string> };
}

export const GifCard: React.FC<Props> = memo(
  ({ style, data, index, isScrolling }) => {
    const { gifs, loadedGifs } = data;
    const gif: Gif = gifs[index];

    const [hasLoadedGif, setHasLoadedGif] = useState(
      loadedGifs.has(gif.images.original.url)
    );

    const gifCardStyle = {
      marginTop: GIF_MARGIN,
      width: GIF_CARD_WIDTH
    };

    const src =
      !hasLoadedGif && isScrolling
        ? gif.images.fixed_width_small_still.url
        : gif.images.original.url;

    function handleLoad(): void {
      if (!isScrolling && !hasLoadedGif) {
        loadedGifs.add(gif.images.original.url);
        setHasLoadedGif(true);
      }
    }

    return (
      <div className="gif-wrapper" style={style} data-testid="gif">
        <div className="gif-card" style={gifCardStyle}>
          <img
            alt={gif.title}
            width={style.width}
            height={(style.height as number) - GIF_MARGIN}
            src={src}
            onLoad={handleLoad}
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
