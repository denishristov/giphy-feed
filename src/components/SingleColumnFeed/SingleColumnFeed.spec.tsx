import React from "react";
import { SingleColumnFeed } from "./SingleColumnFeed";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { GIF_CARD_WIDTH, GIF_MARGIN, GifCard } from "../GifCard/GifCard";
import { mount } from "enzyme";

describe(SingleColumnFeed, () => {
  const defaultProps = {
    feedKey: "id",
    approachFeedEndDelta: 5,
    gifs: FakeSearchGiphyAPISync("kitty", 0, 20),
    loadedGifs: new Set<string>(),
    onApproachingFeedEnd: jest.fn()
  };

  const wrapper = mount(<SingleColumnFeed {...defaultProps} />);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders at least 1 gif", () => {
    expect(wrapper.find(GifCard).length).toBeGreaterThanOrEqual(1);
  });

  it("renders gifs with their appropriate height", () => {
    for (const [i, gif] of wrapper
      .find(GifCard)
      .map(x => x.getDOMNode() as HTMLElement)
      .entries()) {
      const { height, width } = defaultProps.gifs[i].images.downsized_still;

      // Appropriate means scaled, so that the aspect ratio is left unchanged
      const appropriateHeight =
        (Number(height) * GIF_CARD_WIDTH) / Number(width) + GIF_MARGIN;

      expect(gif.style.height).toBe(`${appropriateHeight}px`);
    }
  });
});
