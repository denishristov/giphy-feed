import { Gif } from "../../api/GiphySearchAPI/interfaces";
import { ListChildComponentProps } from "react-window";

export interface SingleColumnFeedItemProps extends ListChildComponentProps {
  data: GifData;
}

export interface GifData {
  margin: number;
  width: number;
  gifs: Array<Gif>;
  loadedGifs: Set<string>;
}
