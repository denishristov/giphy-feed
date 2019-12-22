import React, { useRef, useEffect } from "react";
import { GifCard } from "../GifCard/GifCard";
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
      itemData={gifs}
      width={width}
      height={height}
      columnCount={itemsPerRow}
      rowCount={Math.ceil(gifs.length / itemsPerRow) + placeholdersCount}
      estimatedRowHeight={itemSize}
      estimatedColumnWidth={itemSize}
      rowHeight={getRowAndColumnSize}
      columnWidth={getRowAndColumnSize}
      useIsScrolling={true}
      onItemsRendered={handleItemsRendered}
    >
      {({ columnIndex, rowIndex, style, ...props }) => {
        const index = rowIndex * itemsPerRow + columnIndex;
        const horizontallyCenteredLeftOffset =
          (width - itemsPerRow * (itemMargin + itemSize) - itemMargin) / 2;

        const itemLeftMargin = (columnIndex + 1) * itemMargin;
        const itemTopMargin = (rowIndex + 1) * itemMargin;

        const horizontallyCenteredStyle = {
          ...style,
          width: itemWidth,
          top: Number(style.top) + itemTop + itemTopMargin,
          left:
            Number(style.left) + horizontallyCenteredLeftOffset + itemLeftMargin
        };

        return (
          <GifCard index={index} style={horizontallyCenteredStyle} {...props} />
        );
      }}
    </VariableSizeGrid>
  );

  function getRowAndColumnSize(): number {
    return itemSize;
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
