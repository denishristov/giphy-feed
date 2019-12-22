import React from "react";
import "./Header.scss";
import { debounce } from "debounce";

interface Props {
  height: number;
  onSearchChange(value: string): void;
}

const DEBOUNCE_WAIT: number = 300;

export const Header: React.FC<Props> = ({ height, onSearchChange }) => {
  const debouncedSearchChangeHandler = debounce(onSearchChange, DEBOUNCE_WAIT);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    debouncedSearchChangeHandler(event.target.value);
  }

  return (
    <header className="feed-header" style={{ height }}>
      <input placeholder="Search gifs" onChange={handleChange} />
    </header>
  );
};
