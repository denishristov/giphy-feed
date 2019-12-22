import React, { useRef, useEffect } from "react";
import { GifCard, GifCardData } from "../GifCard/GifCard";
import { VariableSizeGrid, GridOnItemsRenderedProps } from "react-window";
import { GifMetadata } from "../../api/GifSearchAPI";

export interface GridFeedProps {
  feedKey: string;
  width: number;
  height: number;
  itemTop: number;
  itemMargin: number;
  itemSize: number;
  maxItemsPerRow: number;
  approachFeedEndDelta: number;
  placeholdersCount: number;
  gifs: Array<GifMetadata>;
  onApproachingFeedEnd(): void;
}

export const GridFeed: React.FC<GridFeedProps> = ({
  feedKey,
  height,
  width,
  itemTop,
  itemSize,
  itemMargin,
  maxItemsPerRow,
  placeholdersCount,
  gifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<VariableSizeGrid | null>(null);
  const itemsPerRow = Math.min(
    Math.floor(window.innerWidth / getColumnWidth()),
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
      rowHeight={getRowHeight}
      columnWidth={getColumnWidth}
      useIsScrolling={true}
      onItemsRendered={handleItemsRendered}
    >
      {({ columnIndex, rowIndex, style, ...props }) => {
        const index = rowIndex * itemsPerRow + columnIndex;
        const horizontallyCenteredLeftOffset =
          (width - itemsPerRow * getColumnWidth() + itemMargin) / 2;

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

  function getRowHeight(): number {
    return itemSize + itemMargin;
  }

  function getColumnWidth(): number {
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
