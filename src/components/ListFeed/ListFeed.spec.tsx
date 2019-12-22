import React from "react";
import { ListFeed } from "./ListFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { mount } from "enzyme";
import { GifCard } from "../GifCard/GifCard";

describe(ListFeed, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 20);
  const itemWidth = 400;
  const itemMargin = 12;

  const component = (
    <ListFeed
      feedKey={"id"}
      height={window.innerHeight}
      width={window.innerWidth}
      itemTop={82}
      itemMargin={itemMargin}
      itemWidth={itemWidth}
      approachFeedEndDelta={5}
      gifs={gifs}
      onApproachingFeedEnd={jest.fn()}
    />
  );

  const wrapper = mount(component);

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
      const { height, width } = gifs[i].images.still;

      /* Correctly scaled means that the aspect ratio is left unchanged. */
      const appropriateHeight =
        (Number(height) * itemWidth) / Number(width) + itemMargin;

      expect(gif.props.style.height).toBe(appropriateHeight);
    }
  });
});
