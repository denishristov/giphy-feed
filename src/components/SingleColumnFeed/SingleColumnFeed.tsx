import React, { useRef, useEffect } from "react";
import { GifCard } from "../GifCard/GifCard";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { Gif } from "../../api/GiphySearchAPI/interfaces";
import { GifData } from "./SingleColumnFeedItemProps";

interface Props {
  feedKey: string;
  height: number;
  itemWidth: number;
  itemMargin: number;
  approachFeedEndDelta: number;
  gifs: Array<Gif>;
  loadedGifs: Set<string>;
  onApproachingFeedEnd(): void;
}

export const SingleColumnFeed: React.FC<Props> = ({
  feedKey,
  height,
  itemWidth,
  itemMargin,
  gifs,
  loadedGifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<VariableSizeList | null>(null);
  const gifData: GifData = {
    width: itemWidth,
    margin: itemMargin,
    gifs,
    loadedGifs
  };

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [feedKey]);

  function calculateItemHeight(index: number) {
    const gif = gifs[index];

    const { width, height } = gif.images.downsized_still;
    const originalWidth = Number(width);
    const originalHeight = Number(height);

    return (
      Math.round((originalHeight * itemWidth) / originalWidth) + itemMargin
    );
  }

  function getItemKey(index: number): string {
    return gifs[index].id;
  }

  function handleItemsRendered({
    overscanStopIndex
  }: ListOnItemsRenderedProps): void {
    if (overscanStopIndex + approachFeedEndDelta >= gifs.length) {
      onApproachingFeedEnd();
    }
  }

  return (
    <VariableSizeList
      ref={listRef}
      itemData={gifData}
      height={height}
      itemCount={gifs.length}
      itemSize={calculateItemHeight}
      itemKey={getItemKey}
      width={window.innerWidth}
      useIsScrolling={true}
      onItemsRendered={handleItemsRendered}
    >
      {GifCard}
    </VariableSizeList>
  );
};
