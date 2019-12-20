import React from "react";
import "./Header.scss";
import { debounce } from "debounce";

interface Props {
  onSearchChange(value: string): void;
}

const DEBOUNCE_WAIT: number = 300;

export const HEADER_HEIGHT: number = 82;

export const Header: React.FC<Props> = ({ onSearchChange }) => {
  const debouncedSearchChangeHandler = debounce(onSearchChange, DEBOUNCE_WAIT);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    debouncedSearchChangeHandler(event.target.value);
  }

  return (
    <header className="feed-header" data-testid="header">
      <input placeholder="Search gifs..." onChange={handleChange} />
    </header>
  );
};
