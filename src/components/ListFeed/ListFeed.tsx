import React, { useRef, useEffect } from "react";
import { GifCard } from "../GifCard/GifCard";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { FeedProps } from "../../types/FeedProps";

export const ListFeed: React.FC<FeedProps> = ({
  feedKey,
  height,
  width,
  itemTop,
  itemWidth,
  itemMargin,
  gifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<VariableSizeList | null>(null);

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [feedKey, itemWidth]);

  return (
    <VariableSizeList
      ref={listRef}
      itemData={gifs}
      height={height}
      width={width}
      itemCount={gifs.length}
      itemSize={calculateItemHeight}
      onItemsRendered={handleItemsRendered}
    >
      {({ style, ...props }) => {
        const horizontallyCenteredLeftOffset = (width - itemWidth) / 2;

        const horizontallyCenteredStyle = {
          ...style,
          top: Number(style.top) + itemTop + itemMargin,
          left: horizontallyCenteredLeftOffset,
          width: itemWidth,
          height: Number(style.height) - itemMargin
        };

        return <GifCard style={horizontallyCenteredStyle} {...props} />;
      }}
    </VariableSizeList>
  );

  function calculateItemHeight(index: number) {
    const gif = gifs[index];
    const { width, height } = gif.images.still;

    /* Scaled so the aspect ratio is left unchanged. */
    return Math.round((height * itemWidth) / width) + itemMargin;
  }

  function handleItemsRendered({
    overscanStopIndex
  }: ListOnItemsRenderedProps): void {
    if (overscanStopIndex + approachFeedEndDelta >= gifs.length) {
      onApproachingFeedEnd();
    }
  }
};
