import React from "react";
import { Header } from "./Header";
import { render, fireEvent } from "@testing-library/react";

describe(Header, () => {
  it("renders", () => {
    const wrapper = render(<Header onSearchChange={jest.fn()} />);
    expect(wrapper.container).toBeInTheDocument();
  });

  it("renders search", () => {
    const wrapper = render(<Header onSearchChange={jest.fn()} />);
    expect(wrapper.getByPlaceholderText("Search gifs...")).toBeInTheDocument();
  });

  it("calls onSearchChange on input change", () => {
    const handleSearch = jest.fn();
    const wrapper = render(<Header onSearchChange={handleSearch} />);

    fireEvent.change(wrapper.getByPlaceholderText("Search gifs..."), {
      target: { value: "test" }
    });

    expect(handleSearch).toHaveBeenCalledWith("test");
  });
});
