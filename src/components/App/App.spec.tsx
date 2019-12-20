import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { FakeSearchGiphyAPI } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { Header } from "../Header/Header";
import { SingleColumnFeed } from "../SingleColumnFeed/SingleColumnFeed";

describe(App, () => {
  const wrapper = shallow(<App gifSearchApi={FakeSearchGiphyAPI} />);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders header", () => {
    expect(wrapper).toContainMatchingElement(Header.name);
  });

  it("renders feed", () => {
    expect(wrapper).toContainMatchingElement(SingleColumnFeed.name);
  });
});
