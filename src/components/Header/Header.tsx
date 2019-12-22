import React from "react";
import { debounce } from "debounce";
import "./Header.scss";
import { SEARCH_DEBOUNCE_WAIT } from "../../config/ui";

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

  const toggleWrapperClassName = [
    "toggle-wrapper",
    !isAbleToDisplayGridFeed && "hidden"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="feed-header" style={{ height }}>
      <input
        className="search"
        placeholder="Search gifs"
        onChange={handleChangeSearchTerm}
      />
      <div className={toggleWrapperClassName}>
        <label>Grid</label>
        <input
          type="checkbox"
          checked={isUsingGridFeed}
          onChange={handleChangeFeed}
        />
      </div>
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
