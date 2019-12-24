import React, { useRef, useEffect } from "react";
import { GifCard } from "../GifCard/GifCard";
import { GridOnItemsRenderedProps, FixedSizeGrid } from "react-window";
import { FeedProps } from "../../types/FeedProps";

interface GridFeedProps extends FeedProps {
  maxItemsPerRow: number;
}

export const GridFeed: React.FC<GridFeedProps> = ({
  feedKey,
  height,
  width,
  itemTop,
  itemWidth,
  itemMargin,
  maxItemsPerRow,
  placeholdersCount,
  gifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<FixedSizeGrid | null>(null);

  /* Since grid feed's items are squares their height = their width. */
  const itemSize = itemWidth;
  const itemsPerRow = Math.min(
    Math.floor((width - itemMargin) / (itemSize + itemMargin)),
    maxItemsPerRow
  );

  useEffect(() => {
    listRef.current?.scrollToItem({
      columnIndex: 0,
      rowIndex: 0,
      align: "start"
    });
  }, [feedKey]);

  return (
    <FixedSizeGrid
      ref={listRef}
      itemData={gifs}
      width={width}
      height={height}
      columnCount={itemsPerRow}
      rowCount={Math.ceil((gifs.length + placeholdersCount) / itemsPerRow)}
      rowHeight={itemSize + itemMargin}
      columnWidth={itemSize + itemMargin}
      onItemsRendered={handleItemsRendered}
    >
      {({ columnIndex, rowIndex, style, ...props }) => {
        const index = rowIndex * itemsPerRow + columnIndex;
        const horizontallyCenteredLeftOffset =
          (width - itemsPerRow * (itemMargin + itemSize) - itemMargin) / 2;

        const horizontallyCenteredStyle = {
          ...style,
          height: itemSize,
          width: itemSize,
          top: Number(style.top) + itemTop + itemMargin,
          left: Number(style.left) + horizontallyCenteredLeftOffset + itemMargin
        };

        return (
          <GifCard index={index} style={horizontallyCenteredStyle} {...props} />
        );
      }}
    </FixedSizeGrid>
  );

  function handleItemsRendered({
    overscanRowStopIndex,
    overscanColumnStopIndex
  }: GridOnItemsRenderedProps): void {
    const overscanStopIndex =
      overscanRowStopIndex * itemsPerRow + overscanColumnStopIndex;

    if (
      gifs.length !== 0 &&
      overscanStopIndex + approachFeedEndDelta >= gifs.length
    ) {
      onApproachingFeedEnd();
    }
  }
};
