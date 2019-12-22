import React, { useRef, useEffect } from "react";
import { GifCard, GifCardData } from "../GifCard/GifCard";
import { VariableSizeGrid, GridOnItemsRenderedProps } from "react-window";
import { FeedProps } from "../../types/FeedProps";

interface GridFeedProps extends FeedProps {
  maxItemsPerRow: number;
  placeholdersCount: number;
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
  const listRef = useRef<VariableSizeGrid | null>(null);

  /* Since grid feed's items are squares their height = their width. */
  const itemSize = itemWidth;
  const itemsPerRow = Math.min(
    Math.floor(window.innerWidth / getRowAndColumnSize()),
    maxItemsPerRow
  );

  const gifData: GifCardData = {
    width: itemSize,
    margin: itemMargin,
    gifs
  };

  useEffect(() => {
    listRef.current?.scrollToItem({
      columnIndex: 0,
      rowIndex: 0,
      align: "start"
    });
  }, [feedKey]);

  return (
    <VariableSizeGrid
      ref={listRef}
      itemData={gifData}
      width={width}
      height={height}
      columnCount={itemsPerRow}
      rowCount={Math.ceil(gifs.length / itemsPerRow) + placeholdersCount}
      estimatedRowHeight={itemSize + itemMargin}
      rowHeight={getRowAndColumnSize}
      columnWidth={getRowAndColumnSize}
      useIsScrolling={true}
      onItemsRendered={handleItemsRendered}
    >
      {({ columnIndex, rowIndex, style, ...props }) => {
        const index = rowIndex * itemsPerRow + columnIndex;
        const horizontallyCenteredLeftOffset =
          (width - itemsPerRow * getRowAndColumnSize() + itemMargin) / 2;

        const horizontallyCenteredStyle = {
          ...style,
          top: Number(style.top) + itemTop,
          left: Number(style.left) + horizontallyCenteredLeftOffset
        };

        return (
          <GifCard index={index} style={horizontallyCenteredStyle} {...props} />
        );
      }}
    </VariableSizeGrid>
  );

  function getRowAndColumnSize(): number {
    return itemSize + itemMargin;
  }

  function handleItemsRendered({
    overscanRowStopIndex,
    overscanColumnStopIndex
  }: GridOnItemsRenderedProps): void {
    const overscanStopIndex =
      overscanRowStopIndex * itemsPerRow + overscanColumnStopIndex;

    if (overscanStopIndex + approachFeedEndDelta >= gifs.length) {
      onApproachingFeedEnd();
    }
  }
};
