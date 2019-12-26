import React from "react";
import { Header } from "./Header";
import { shallow } from "enzyme";

describe(Header, () => {
  const handleSearch = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <Header
      height={66}
      isUsingGridFeed={true}
      isAbleToSwitchToGridFeed={true}
      onChangeUsingGridFeed={handleToggle}
      onSearchTermChange={handleSearch}
    />
  );

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("sets provided height", () => {
    expect(wrapper.find("header").props().style?.height).toBe(66);
  });

  describe("search", () => {
    it("renders search input", () => {
      expect(wrapper.find('input[placeholder="Search gifs"]')).toExist();
    });

    it("calls onSearchChange on input change", () => {
      wrapper.find('input[placeholder="Search gifs"]').simulate("change", {
        target: { value: "test" }
      });

      expect(handleSearch).toHaveBeenCalledWith("test");
    });
  });

  describe("feed type toggle", () => {
    it("renders input checkbox for toggling between feed types", () => {
      expect(wrapper.find('input[type="checkbox"]')).toExist();
    });

    it("passes provided value for checkbox", () => {
      expect(wrapper.find('input[type="checkbox"]').props().checked).toBe(true);
    });

    it("calls onChangeUsingGridFeed when the input emits change", () => {
      wrapper
        .find('input[type="checkbox"]')
        .simulate("change", { target: { checked: false } });
      expect(handleToggle).toHaveBeenCalledWith(false);
    });
  });
});
