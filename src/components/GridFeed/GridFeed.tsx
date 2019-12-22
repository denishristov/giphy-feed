/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { GifCard, GifCardData } from "../GifCard/GifCard";
import { VariableSizeGrid, GridOnItemsRenderedProps } from "react-window";
import { GifMetadata } from "../../api/GifSearchAPI";

interface Props {
  feedKey: string;
  itemTop: number;
  height: number;
  maxItemsPerRow: number;
  maxItemSize: number;
  itemMargin: number;
  approachFeedEndDelta: number;
  gifs: Array<GifMetadata>;
  loadedGifs: Set<string>;
  onApproachingFeedEnd(): void;
}

export const GridFeed: React.FC<Props> = ({
  feedKey,
  itemTop,
  height,
  maxItemsPerRow,
  maxItemSize,
  itemMargin,
  gifs,
  loadedGifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<VariableSizeGrid | null>(null);

  const [itemSize, setItemSize] = useState(
    Math.min(maxItemSize, window.innerWidth - 2 * itemMargin)
  );

  const [itemsPerRow, setItemsPerRow] = useState(
    Math.min(Math.floor(window.innerWidth / getColumnWidth()), maxItemsPerRow)
  );

  const [width, setWidth] = useState(window.innerWidth);

  const gifData: GifCardData = {
    width: itemSize,
    margin: itemMargin,
    gifs,
    loadedGifs
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

    function handleResize(): void {
      setWidth(window.innerWidth);
      setItemSize(Math.min(maxItemSize, window.innerWidth - 2 * itemMargin));
      setItemsPerRow(
        Math.min(
          Math.floor(window.innerWidth / getColumnWidth()),
          maxItemsPerRow
        )
      );
    }
  }, [itemMargin, maxItemSize, maxItemsPerRow]);

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
      rowCount={Math.ceil(gifs.length / 3) + 30}
      estimatedRowHeight={itemSize + itemMargin}
      rowHeight={getRowHeight}
      columnWidth={getColumnWidth}
      useIsScrolling={true}
      onItemsRendered={handleItemsRendered}
    >
      {({ columnIndex, rowIndex, style, ...props }) => {
        const index = rowIndex * itemsPerRow + columnIndex;
        const horizontallyCenteredLeftOffset =
          (window.innerWidth - itemsPerRow * getColumnWidth() + itemMargin) / 2;

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
