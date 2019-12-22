import React from "react";
import { mount, shallow } from "enzyme";
import { GifCard } from "./GifCard";
import { FakeSearchGiphyAPISync } from "../../api/GiphySearchAPI/FakeGiphySearchAPI";

describe(GifCard.name, () => {
  const { gifs } = FakeSearchGiphyAPISync("kitty", 0, 20);
  const component = (
    <GifCard
      style={{
        width: 300,
        height: 200
      }}
      data={gifs}
      index={0}
      isScrolling={false}
    />
  );

  const wrapper = shallow(component);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders without metadata", () => {
    const wrapper = shallow(component);
    wrapper.setProps({ index: -1 });
    expect(wrapper).toExist();
  });

  it("renders img", () => {
    expect(wrapper.find(".gif")).toExist();
  });

  it("renders gif link", () => {
    expect(wrapper.find("a").props().href).toBe(gifs[0].url);
    expect(wrapper.find("a").text()).toBe(gifs[0].title);
  });

  it("renders original and still img sources", () => {
    expect(wrapper.find(".gif").props().src).toBe(gifs[0].images.still.url);
    expect(wrapper.find(".background-fetcher").props().src).toBe(
      gifs[0].images.original.url
    );
  });

  it("does not render background fetcher until it has stopped scrolling", () => {
    const wrapper = mount(
      <GifCard
        style={{
          width: 300,
          height: 200
        }}
        data={gifs}
        index={0}
        isScrolling={true}
      />
    );

    expect(wrapper.find(".background-fetcher")).not.toExist();

    wrapper.setProps({ isScrolling: false });
    wrapper.update();

    expect(wrapper.find(".background-fetcher")).toExist();
  });
});
