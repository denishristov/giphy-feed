import React from "react";
import { GridFeed } from "./GridFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { mount } from "enzyme";
import { GifCard } from "../GifCard/GifCard";

describe(GridFeed, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 20);
  const itemWidth = 400;
  const itemMargin = 12;

  const component = (
    <GridFeed
      feedKey={"id"}
      itemTop={82}
      height={window.innerHeight}
      width={window.innerWidth}
      itemWidth={itemWidth}
      maxItemsPerRow={3}
      itemMargin={itemMargin}
      approachFeedEndDelta={5}
      placeholdersCount={30}
      gifs={gifs}
      onApproachingFeedEnd={jest.fn()}
    />
  );

  const wrapper = mount(component);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders at least 3 gifs", () => {
    expect(wrapper.find(GifCard).length).toBeGreaterThanOrEqual(3);
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
