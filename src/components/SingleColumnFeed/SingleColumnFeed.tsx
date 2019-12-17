import React, { useRef, useEffect } from "react";
import { GifCard, GIF_CARD_WIDTH } from "../GifCard/GifCard";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { GifMetadata } from "../../api/GiphyAPI/interfaces";

interface Props {
  feedKey: string;
  gifs: Array<GifMetadata>;
  onApproachingFeedEnd(): void;
}

const APPROACHING_FEED_END_DELTA: number = 4;

export const SingleColumnFeed: React.FC<Props> = ({
  feedKey,
  gifs,
  onApproachingFeedEnd
}) => {
  const listRef = useRef<VariableSizeList | null>(null);

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [feedKey]);

  function calculateItemHeight(index: number) {
    const gif = gifs[index];

    const { width, height } = gif.images.fixed_width_small_still;
    const originalWidth = Number(width);
    const originalHeight = Number(height);

    return Math.round((originalHeight * GIF_CARD_WIDTH) / originalWidth);
  }

  function getItemKey(index: number, data: Array<GifMetadata>): string {
    return data[index].id;
  }

  function handleItemsRendered({
    overscanStopIndex
  }: ListOnItemsRenderedProps): void {
    if (overscanStopIndex + APPROACHING_FEED_END_DELTA >= gifs.length) {
      onApproachingFeedEnd();
    }
  }

  return (
    <VariableSizeList
      ref={listRef}
      itemData={gifs}
      height={window.innerHeight - 82}
      itemCount={gifs.length}
      itemSize={calculateItemHeight}
      itemKey={getItemKey}
      width={window.innerWidth}
      onItemsRendered={handleItemsRendered}
    >
      {GifCard}
    </VariableSizeList>
  );
};
