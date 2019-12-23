import React from "react";
import { debounce } from "debounce";
import "./Header.scss";
import {
  SEARCH_DEBOUNCE_WAIT,
  TOGGLE_LEFT_MARGIN,
  TOGGLE_WIDTH
} from "../../config/ui";

interface Props {
  height: number;
  isUsingGridFeed: boolean;
  isAbleToDisplayGridFeed: boolean;
  onChangeUsingGridFeed(value: boolean): void;
  onSearchTermChange(value: string): void;
}

export const Header: React.FC<Props> = ({
  height,
  isUsingGridFeed,
  isAbleToDisplayGridFeed,
  onChangeUsingGridFeed,
  onSearchTermChange
}) => {
  const debouncedSearchChangeHandler = debounce(
    onSearchTermChange,
    SEARCH_DEBOUNCE_WAIT
  );

  const inputLeftMargin: number = isAbleToDisplayGridFeed
    ? TOGGLE_WIDTH + TOGGLE_LEFT_MARGIN
    : 0;

  return (
    <header className="feed-header" style={{ height }}>
      <input
        className="search"
        placeholder="Search gifs"
        style={{ marginLeft: inputLeftMargin }}
        onChange={handleChangeSearchTerm}
      />
      {isAbleToDisplayGridFeed && (
        <div
          className="toggle-wrapper"
          style={{ marginLeft: TOGGLE_LEFT_MARGIN, width: TOGGLE_WIDTH }}
        >
          <label>Grid</label>
          <input
            type="checkbox"
            checked={isUsingGridFeed}
            onChange={handleChangeFeed}
          />
        </div>
      )}
    </header>
  );

  function handleChangeSearchTerm(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    debouncedSearchChangeHandler(event.target.value);
  }

  function handleChangeFeed(event: React.ChangeEvent<HTMLInputElement>): void {
    onChangeUsingGridFeed(event.target.checked);
  }
};
