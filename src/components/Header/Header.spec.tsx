import React from "react";
import { Header } from "./Header";
import { shallow } from "enzyme";

describe(Header, () => {
  const handleSearch = jest.fn();
  const wrapper = shallow(<Header height={66} onSearchChange={handleSearch} />);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders search input", () => {
    expect(wrapper.find('input[placeholder="Search gifs..."]')).toExist();
  });

  it("calls onSearchChange on input change", () => {
    wrapper.find("input").simulate("change", {
      target: { value: "test" }
    });

    expect(handleSearch).toHaveBeenCalledWith("test");
  });
});
