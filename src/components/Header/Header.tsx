import React from "react";
import { debounce } from "debounce";
import "./Header.scss";
// import "./Toggle.scss";

interface Props {
  height: number;
  isUsingGridFeed: boolean;
  isAbleToDisplayGridFeed: boolean;
  onChangeFeed(value: boolean): void;
  onSearchTermChange(value: string): void;
}

const DEBOUNCE_WAIT: number = 300;

export const Header: React.FC<Props> = ({
  height,
  isUsingGridFeed,
  isAbleToDisplayGridFeed,
  onChangeFeed,
  onSearchTermChange: onSearchChange
}) => {
  const debouncedSearchChangeHandler = debounce(onSearchChange, DEBOUNCE_WAIT);

  function handleChangeSearchTerm(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    debouncedSearchChangeHandler(event.target.value);
  }

  function handleChangeFeed(event: React.ChangeEvent<HTMLInputElement>): void {
    onChangeFeed(event.target.checked);
  }

  return (
    <header className="feed-header" style={{ height }}>
      <input
        className="search"
        placeholder="Search gifs"
        onChange={handleChangeSearchTerm}
      />
      <div
        className={["toggle-wrapper", !isAbleToDisplayGridFeed && "hidden"]
          .filter(Boolean)
          .join(" ")}
      >
        <label>Grid</label>
        <input
          type="checkbox"
          checked={isUsingGridFeed}
          onChange={handleChangeFeed}
        />
      </div>
    </header>
  );
};
