import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { FakeSearchGiphyAPI } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { Header } from "../Header/Header";
import { GridFeed } from "../GridFeed/GridFeed";
import { ListFeed } from "../ListFeed/ListFeed";
import { act } from "react-test-renderer";

describe(App, () => {
  const defaultWrapper = shallow(<App gifSearchApi={FakeSearchGiphyAPI} />);

  it("renders", () => {
    expect(defaultWrapper).toExist();
  });

  it("renders header", () => {
    expect(defaultWrapper).toContainMatchingElement(Header.name);
  });

  it("renders grid feed if window width is above list view threshold", () => {
    expect(defaultWrapper).toContainMatchingElement(GridFeed.name);
  });

  it("toggles between feeds when Header calls onChangeFeed", () => {
    expect(defaultWrapper).toContainMatchingElement(GridFeed.name);

    act(() => {
      defaultWrapper
        .findWhere(x => x.name() === Header.name)
        .getElement()
        .props.onChangeUsingGridFeed(false);
    });

    expect(defaultWrapper).toContainMatchingElement(ListFeed.name);

    act(() => {
      defaultWrapper
        .findWhere(x => x.name() === Header.name)
        .getElement()
        .props.onChangeUsingGridFeed(true);
    });

    expect(defaultWrapper).toContainMatchingElement(GridFeed.name);
  });

  it("renders list feed if window width is above list view threshold", () => {
    const oldWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 200
    });

    const wrapper = shallow(<App gifSearchApi={FakeSearchGiphyAPI} />);

    expect(wrapper).toContainMatchingElement(ListFeed.name);

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: oldWidth
    });
  });
});
