import React, { useRef, useEffect, useState } from "react";
import { GifCard } from "../GifCard/GifCard";
import { VariableSizeList, ListOnItemsRenderedProps } from "react-window";
import { GifData } from "./ListFeedItemProps";
import { GifMetadata } from "../../api/GifSearchAPI";

interface Props {
  feedKey: string;
  height: number;
  itemWidth: number;
  itemMargin: number;
  approachFeedEndDelta: number;
  gifs: Array<GifMetadata>;
  loadedGifs: Set<string>;
  onApproachingFeedEnd(): void;
}

export const ListFeed: React.FC<Props> = ({
  feedKey,
  height,
  itemWidth,
  itemMargin,
  gifs,
  loadedGifs,
  approachFeedEndDelta,
  onApproachingFeedEnd
}) => {
  const gifData: GifData = {
    width: itemWidth,
    margin: itemMargin,
    gifs,
    loadedGifs
  };

  const listRef = useRef<VariableSizeList | null>(null);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

    function handleResize(): void {
      setWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [feedKey]);

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
      {GifCard}
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
