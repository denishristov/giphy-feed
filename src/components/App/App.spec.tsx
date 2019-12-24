import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import { App } from "./App";
import { FakeSearchGiphyAPI } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { Header } from "../Header/Header";
import { GridFeed } from "../GridFeed/GridFeed";
import { ListFeed } from "../ListFeed/ListFeed";
import { act } from "react-dom/test-utils";
import { INITIAL_SEARCH_TERM, PAGINATION_OFFSET } from "../../config/ui";

describe(App, () => {
  const defaultWrapper = shallow(<App gifSearchApi={FakeSearchGiphyAPI} />);

  it("renders", () => {
    expect(defaultWrapper).toExist();
  });

  it("renders header", () => {
    expect(defaultWrapper).toContainMatchingElement(Header.name);
  });

  describe("API calls", () => {
    it("calls API when Header calls onSearchTermChange", async () => {
      const api = jest.fn(FakeSearchGiphyAPI);
      const wrapper = mount(<App gifSearchApi={api} />);

      act(() => {
        wrapper
          .find(Header)
          .props()
          .onSearchTermChange("kitty");
      });

      await waitUpdates(wrapper);

      expect(api).toHaveBeenCalledWith("kitty", 0, PAGINATION_OFFSET);
    });

    it("calls API when Feed calls onApproachFeedEnd", async () => {
      const api = jest.fn(FakeSearchGiphyAPI);
      const wrapper = mount(<App gifSearchApi={api} />);

      act(() => {
        wrapper
          .find(GridFeed)
          .props()
          .onApproachingFeedEnd();
      });

      await waitUpdates(wrapper);

      expect(api).toHaveBeenCalledWith(
        INITIAL_SEARCH_TERM,
        0,
        PAGINATION_OFFSET
      );
    });
  });

  describe("feeds", () => {
    it("renders grid feed if window width is above list view threshold", () => {
      expect(defaultWrapper).toContainMatchingElement(GridFeed.name);
    });

    it("toggles between feeds when Header calls onChangeFeed", () => {
      expect(defaultWrapper).toContainMatchingElement(GridFeed.name);

      const { onChangeUsingGridFeed } = defaultWrapper.find(Header).props();

      onChangeUsingGridFeed(false);

      expect(defaultWrapper).toContainMatchingElement(ListFeed.name);

      onChangeUsingGridFeed(true);

      expect(defaultWrapper).toContainMatchingElement(GridFeed.name);
    });

    it("renders list feed if window's width is resized below list view threshold", async () => {
      const wrapper = mount(<App gifSearchApi={FakeSearchGiphyAPI} />);

      act(() => {
        Object.defineProperty(window, "innerWidth", {
          configurable: true,
          value: 200
        });

        window.dispatchEvent(new Event("resize"));
      });

      await waitUpdates(wrapper);

      expect(wrapper).toContainMatchingElement(ListFeed.name);
    });
  });
});

async function waitUpdates<P = {}>(wrapper: ReactWrapper<P>) {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
}
