/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { GifCard } from "../GifCard/GifCard";
import { VariableSizeGrid, GridOnItemsRenderedProps } from "react-window";
import { GifMetadata } from "../../api/GifSearchAPI";
import { GifData } from "../ListFeed/ListFeedItemProps";

interface Props {
  feedKey: string;
  top: number;
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
  top,
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

  const gifData: GifData = {
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
        const horizontallyCenteredStyle = {
          ...style,
          top: Number(style.top) + top,
          left:
            Number(style.left) +
            (window.innerWidth - itemsPerRow * getColumnWidth() + itemMargin) /
              2
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
    if (
      overscanRowStopIndex * itemsPerRow +
        overscanColumnStopIndex +
        approachFeedEndDelta >=
      gifs.length
    ) {
      onApproachingFeedEnd();
    }
  }
};
