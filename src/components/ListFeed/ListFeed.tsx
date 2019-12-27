import React, { useRef, useEffect, useState } from "react";
import { GifCard } from "../GifCard/GifCard";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { FeedProps } from "../../types/FeedProps";
import { GifMetadata } from "../../types/GifSearchAPI";

export const ListFeed: React.FC<FeedProps> = ({
  feedKey,
  height,
  width,
  itemTop,
  itemWidth,
  itemMargin,
  placeholdersCount,
  gifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<VariableSizeList | null>(null);
  const [placeholderStartIndex, setPlaceholderStartIndex] = useState(0);

  useEffect(() => {
    listRef.current?.resetAfterIndex(placeholderStartIndex, false);
    setPlaceholderStartIndex(gifs.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gifs.length]);

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, false);
    listRef.current?.scrollToItem(0);
  }, [feedKey]);

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [itemWidth]);

  return (
    <VariableSizeList
      ref={listRef}
      itemData={gifs}
      height={height}
      width={width}
      itemCount={gifs.length + placeholdersCount}
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
    const gif: GifMetadata | undefined = gifs[index];

    if (gif === undefined) {
      return itemWidth;
    }

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
