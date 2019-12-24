import React from "react";
import { GridFeed } from "./GridFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { mount } from "enzyme";
import { GifCard } from "../GifCard/GifCard";
import { FixedSizeGrid } from "react-window";
import { GifCardPlaceholder } from "../GifCard/GifCardPlaceholder/GifCardPlaceholder";

describe(GridFeed, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 30);
  const itemSize = 200;
  const itemMargin = 12;
  const itemTop = 82;
  const maxItemsPerRow = 3;
  const approachFeedEndHandler = jest.fn();
  const approachFeedEndDelta = 15;

  const component = (
    <GridFeed
      feedKey={"id"}
      itemTop={itemTop}
      height={window.innerHeight}
      width={window.innerWidth}
      itemWidth={itemSize}
      maxItemsPerRow={maxItemsPerRow}
      itemMargin={itemMargin}
      approachFeedEndDelta={approachFeedEndDelta}
      placeholdersCount={30}
      gifs={gifs}
      onApproachingFeedEnd={approachFeedEndHandler}
    />
  );

  const wrapper = mount(component);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders at least 3 gifs", () => {
    expect(wrapper.find(GifCard).length).toBeGreaterThanOrEqual(3);
  });

  it("renders placeholders", () => {
    wrapper.setProps({ gifs: [] });
    expect(wrapper.find(GifCardPlaceholder).length).toBeGreaterThanOrEqual(3);
    wrapper.setProps({ gifs });
  });

  it("layouts items", () => {
    const horizontallyCenteredLeftOffset =
      (window.innerWidth -
        maxItemsPerRow * (itemMargin + itemSize) -
        itemMargin) /
      2;

    for (const [i, gif] of wrapper
      .find(GifCard)
      .getElements()
      .entries()) {
      const accumulatedLeftOffset =
        (i % maxItemsPerRow) * itemSize +
        ((i % maxItemsPerRow) + 1) * itemMargin;

      const accumulatedTopOffset =
        Math.floor(i / 3) * (itemMargin + itemSize) + itemMargin;

      expect(gif.props.style).toMatchObject({
        height: itemSize,
        width: itemSize,
        left: horizontallyCenteredLeftOffset + accumulatedLeftOffset,
        top: accumulatedTopOffset + itemTop
      });
    }
  });

  it('calls onApproachFeedEnd when there are "approachFeedEndDelta" amount of items to be scrolled', () => {
    wrapper.find(FixedSizeGrid).props().onItemsRendered!({
      overscanColumnStopIndex: 0,
      overscanColumnStartIndex: 0,
      overscanRowStartIndex: 0,
      overscanRowStopIndex:
        (gifs.length - approachFeedEndDelta) / maxItemsPerRow,
      visibleColumnStartIndex: 0,
      visibleColumnStopIndex: 0,
      visibleRowStartIndex: 0,
      visibleRowStopIndex: 0
    });

    expect(approachFeedEndHandler).toHaveBeenCalled();
  });

  it("collapses into less items per row when unable to fit previous amount", () => {
    wrapper.setProps({ width: 500 });

    expect(wrapper.find(FixedSizeGrid).props().columnCount).toBe(2);
  });
});
