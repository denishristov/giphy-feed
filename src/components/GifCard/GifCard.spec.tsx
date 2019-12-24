import React from "react";
import { shallow, mount } from "enzyme";
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

  it("renders img with still stc", () => {
    expect(wrapper.find("img")).toExist();
    expect(wrapper.find("img").props().src).toBe(gifs[0].images.still.url);
  });

  it("renders gif link", () => {
    expect(wrapper.find("a").props().href).toBe(gifs[0].url);
    expect(wrapper.find("a").text()).toBe(gifs[0].title);
  });

  it("renders video and removes img when original and still load", () => {
    const wrapper = mount(component);

    expect(wrapper.find("video")).not.toExist();
    expect(wrapper.find("img")).toExist();

    wrapper.find("img").simulate("load");
    wrapper.find("video").simulate("loadeddata");

    expect(wrapper.find("video")).toExist();
    expect(wrapper.find("img")).not.toExist();
    expect(wrapper.find('source[type="video/mp4"]').props().src).toBe(
      gifs[0].images.original.url
    );
  });
});
