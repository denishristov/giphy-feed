import React, { useRef, useEffect } from "react";
import { GifCard, GifCardData } from "../GifCard/GifCard";
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
  const gifData: GifCardData = {
    width: itemWidth,
    margin: itemMargin,
    gifs
  };

  const listRef = useRef<VariableSizeList | null>(null);

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [feedKey, itemWidth]);

  return (
    <VariableSizeList
      ref={listRef}
      itemData={gifData}
      height={height}
      width={width}
      itemCount={gifs.length}
      itemSize={calculateItemHeight}
      useIsScrolling={true}
      onItemsRendered={handleItemsRendered}
    >
      {({ style, ...props }) => {
        const horizontallyCenteredLeftOffset = (width - itemWidth) / 2;

        const horizontallyCenteredStyle = {
          ...style,
          top: Number(style.top) + itemTop,
          left: Number(style.left) + horizontallyCenteredLeftOffset
        };

        return <GifCard style={horizontallyCenteredStyle} {...props} />;
      }}
    </VariableSizeList>
  );

  function calculateItemHeight(index: number) {
    const gif = gifs[index];

    const { width, height } = gif.images.still;

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
