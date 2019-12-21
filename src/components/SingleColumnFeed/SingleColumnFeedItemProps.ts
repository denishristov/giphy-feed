import { ListChildComponentProps } from "react-window";
import { Gif } from "../../api/GifSearchAPI";

export interface SingleColumnFeedItemProps extends ListChildComponentProps {
  data: GifData;
}

export interface GifData {
  margin: number;
  width: number;
  gifs: Array<Gif>;
  loadedGifs: Set<string>;
}
