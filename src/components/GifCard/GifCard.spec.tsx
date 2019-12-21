import React from "react";
import { mount } from "enzyme";
import { GifCard } from "./GifCard";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";
import { act } from "@testing-library/react-hooks";

describe(GifCard.name, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 20);
  const component = (
    <GifCard
      style={{
        width: 300,
        height: 200
      }}
      data={{
        width: 400,
        margin: 200,
        gifs,
        loadedGifs: new Set()
      }}
      index={0}
      isScrolling={false}
    />
  );

  const wrapper = mount(component);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders img", () => {
    expect(wrapper.find(".gif")).toExist();
  });

  it("renders gif link", () => {
    expect(wrapper.find("a").getDOMNode<HTMLAnchorElement>().href).toBe(
      gifs[0].url
    );
  });

  it("uses original image src initially", () => {
    expect(wrapper.find(".gif").getDOMNode<HTMLImageElement>().src).toBe(
      gifs[0].images.original.url
    );
  });

  it("uses small image src when scrolling", () => {
    wrapper.setProps({ isScrolling: true });
    expect(wrapper.find(".gif").getDOMNode<HTMLImageElement>().src).toBe(
      gifs[0].images.still.url
    );
  });

  it("uses original image src when scrolling if it has already been fetched", () => {
    const wrapper = mount(component);

    expect(wrapper.find(".gif").getDOMNode<HTMLImageElement>().src).toBe(
      gifs[0].images.original.url
    );

    act(() => {
      wrapper.find(".gif").simulate("load");
    });

    wrapper.setProps({ isScrolling: true });
    expect(wrapper.find(".gif").getDOMNode<HTMLImageElement>().src).toBe(
      gifs[0].images.original.url
    );
  });
});
