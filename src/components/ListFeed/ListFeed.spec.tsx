import React from "react";
import { ListFeed } from "./ListFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { mount } from "enzyme";
import { GifCard } from "../GifCard/GifCard";

describe(ListFeed, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 20);
  const itemWidth = 400;
  const itemMargin = 12;
  const itemTop = 82;
  const handleApproachFeedEnd = jest.fn();

  const component = (
    <ListFeed
      feedKey={"id"}
      height={window.innerHeight}
      width={window.innerWidth}
      itemTop={itemTop}
      itemMargin={itemMargin}
      itemWidth={itemWidth}
      approachFeedEndDelta={5}
      gifs={gifs}
      onApproachingFeedEnd={handleApproachFeedEnd}
    />
  );

  const wrapper = mount(component);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders at least 1 gif", () => {
    expect(wrapper.find(GifCard).length).toBeGreaterThanOrEqual(1);
  });

  it("layouts items", () => {
    let topOffsetAccumulator = itemMargin;

    for (const [i, gif] of wrapper
      .find(GifCard)
      .getElements()
      .entries()) {
      const { height, width } = gifs[i].images.still;

      /* Scaled so the aspect ratio is left unchanged. */
      const scaledHeight = (height * itemWidth) / width;

      const horizontallyCenteredLeftOffset =
        (window.innerWidth - itemWidth) / 2;

      expect(gif.props.style).toMatchObject({
        height: scaledHeight,
        width: itemWidth,
        left: horizontallyCenteredLeftOffset,
        top: topOffsetAccumulator + itemTop
      });

      topOffsetAccumulator += itemMargin + scaledHeight;
    }
  });
});
