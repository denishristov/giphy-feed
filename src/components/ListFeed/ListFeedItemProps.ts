import { ListChildComponentProps } from "react-window";
import { GifMetadata } from "../../api/GifSearchAPI";

export interface ListFeedItemProps extends ListChildComponentProps {
  data: GifData;
}

export interface GifData {
  margin: number;
  width: number;
  gifs: Array<GifMetadata>;
  loadedGifs: Set<string>;
}
