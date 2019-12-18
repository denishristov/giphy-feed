import React from "react";
import { SingleColumnFeed } from "./SingleColumnFeed";
import { render, RenderResult } from "@testing-library/react";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { GIF_CARD_WIDTH, GIF_MARGIN } from "../GifCard/GifCard";

describe(SingleColumnFeed, () => {
  const defaultProps = {
    feedKey: "id",
    approachFeedEndDelta: 5,
    gifs: FakeSearchGiphyAPISync("kitty", 0, 20),
    onApproachingFeedEnd: jest.fn()
  };

  it("renders", () => {
    const wrapper = render(<SingleColumnFeed {...defaultProps} />);
    expect(wrapper.container).toBeInTheDocument();
  });

  it("renders at least 1 gif", () => {
    const wrapper = render(<SingleColumnFeed {...defaultProps} />);

    expect(wrapper.getAllByRole("gif").length).toBeGreaterThanOrEqual(1);
  });

  it("renders gifs with their appropriate height", () => {
    const wrapper = render(<SingleColumnFeed {...defaultProps} />);

    for (const [index, gif] of wrapper.getAllByRole("gif").entries()) {
      const { height, width } = defaultProps.gifs[
        index
      ].images.fixed_width_small_still;
      // Appropriate means scaled, so that the aspect ratio is left unchanged
      const appropriateHeight =
        (Number(height) * GIF_CARD_WIDTH) / Number(width) + GIF_MARGIN;

      expect(gif.style.height).toBe(`${appropriateHeight}px`);
    }
  });
});
