import React, { useRef, useEffect } from "react";
import { GifCard, GIF_CARD_WIDTH, GIF_MARGIN } from "../GifCard/GifCard";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { GifMetadata } from "../../api/GiphySearchAPI/interfaces";

interface Props {
  feedKey: string;
  approachFeedEndDelta: number;
  gifs: Array<GifMetadata>;
  onApproachingFeedEnd(): void;
}

export const SingleColumnFeed: React.FC<Props> = ({
  feedKey,
  gifs,
  approachFeedEndDelta,
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

    return (
      Math.round((originalHeight * GIF_CARD_WIDTH) / originalWidth) + GIF_MARGIN
    );
  }

  function getItemKey(index: number, data: Array<GifMetadata>): string {
    return data[index].id;
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
