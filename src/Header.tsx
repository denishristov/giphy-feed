import React from "react";
import "./Header.scss";

interface Props {
  onSearchChange(value: string): void;
}

export const Header: React.FC<Props> = ({ onSearchChange }) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onSearchChange(event.target.value);
    console.log(event.target.value);
  }

  return (
    <header className="feed-header">
      <input placeholder="Search gifs..." onChange={handleChange} />
    </header>
  );
};
