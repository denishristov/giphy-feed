import React, { CSSProperties } from "react";
import { debounce } from "debounce";
import "./Header.scss";
import {
  SEARCH_DEBOUNCE_WAIT,
  TOGGLE_WIDTH,
  GIF_MAX_WIDTH
} from "../../config/ui";

interface Props {
  height: number;
  isUsingGridFeed: boolean;
  isAbleToSwitchToGridFeed: boolean;
  onChangeUsingGridFeed(value: boolean): void;
  onSearchTermChange(value: string): void;
}

export const Header: React.FC<Props> = ({
  height,
  isUsingGridFeed,
  isAbleToSwitchToGridFeed,
  onChangeUsingGridFeed,
  onSearchTermChange
}) => {
  const debouncedSearchChangeHandler = debounce(
    onSearchTermChange,
    SEARCH_DEBOUNCE_WAIT
  );

  const toggleWidthStyle: CSSProperties = { width: TOGGLE_WIDTH };

  return (
    <header className="feed-header" style={{ height }}>
      {isAbleToSwitchToGridFeed && <div style={toggleWidthStyle} />}
      <input
        className="search"
        placeholder="Search gifs"
        style={{ maxWidth: GIF_MAX_WIDTH }}
        onChange={handleChangeSearchTerm}
      />
      {isAbleToSwitchToGridFeed && (
        <div className="toggle-wrapper" style={toggleWidthStyle}>
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
