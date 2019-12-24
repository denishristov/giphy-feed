import { GifMetadata } from "./GifSearchAPI";

export interface FeedProps {
  feedKey: string;
  width: number;
  height: number;
  itemTop: number;
  itemMargin: number;
  itemWidth: number;
  approachFeedEndDelta: number;
  placeholdersCount: number;
  gifs: Array<GifMetadata>;
  onApproachingFeedEnd(): void;
}
