import React from "react";
import { GridFeed } from "./GridFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { mount } from "enzyme";
import { GifCard } from "../GifCard/GifCard";

describe(GridFeed, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 20);
  const itemSize = 200;
  const itemMargin = 12;
  const itemTop = 82;
  const maxItemsPerRow = 3;

  const component = (
    <GridFeed
      feedKey={"id"}
      itemTop={itemTop}
      height={window.innerHeight}
      width={window.innerWidth}
      itemWidth={itemSize}
      maxItemsPerRow={maxItemsPerRow}
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

  it("layouts items", () => {
    let topOffsetAccumulator = itemMargin;

    const horizontallyCenteredLeftOffset =
      (window.innerWidth -
        maxItemsPerRow * (itemMargin + itemSize) -
        itemMargin) /
      2;

    for (const [i, gif] of wrapper
      .find(GifCard)
      .getElements()
      .entries()) {
      expect(gif.props.style).toMatchObject({
        height: itemSize,
        width: itemSize,
        left:
          horizontallyCenteredLeftOffset +
          (i % maxItemsPerRow) * itemSize +
          ((i % maxItemsPerRow) + 1) * itemMargin,
        top: topOffsetAccumulator + itemTop
      });

      if ((i + 1) % maxItemsPerRow === 0) {
        topOffsetAccumulator += itemMargin + itemSize;
      }
    }
  });
});
