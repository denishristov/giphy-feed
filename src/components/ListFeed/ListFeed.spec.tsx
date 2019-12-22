import React from "react";
import { ListFeed } from "./ListFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { mount } from "enzyme";
import { GifCard } from "../GifCard/GifCard";

describe(ListFeed, () => {
  const defaultProps = {
    feedKey: "id",
    height: window.innerHeight - 82,
    itemWidth: 400,
    itemMargin: 20,
    approachFeedEndDelta: 5,
    gifs: FakeSearchGiphyAPISync("kitty", 0, 20).gifs,
    loadedGifs: new Set<string>(),
    onApproachingFeedEnd: jest.fn()
  };

  const wrapper = mount(<ListFeed {...defaultProps} />);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders at least 1 gif", () => {
    expect(wrapper.find(GifCard).length).toBeGreaterThanOrEqual(1);
  });

  it("passes correctly scaled height to children", () => {
    for (const [i, gif] of wrapper
      .find(GifCard)
      .getElements()
      .entries()) {
      const { height, width } = defaultProps.gifs[i].images.still;

      /* Correctly scaled means that the aspect ratio is left unchanged. */
      const appropriateHeight =
        (Number(height) * defaultProps.itemWidth) / Number(width) +
        defaultProps.itemMargin;

      expect(gif.props.style.height).toBe(appropriateHeight);
    }
  });
});
