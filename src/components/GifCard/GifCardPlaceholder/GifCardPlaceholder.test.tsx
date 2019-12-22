import React from "react";
import { shallow } from "enzyme";
import { GifCardPlaceholder } from "./GifCardPlaceholder";

describe(GifCardPlaceholder, () => {
  const component = (
    <GifCardPlaceholder
      style={{
        width: 300,
        height: 200
      }}
      gifCardStyle={{ marginTop: 12, width: 100 }}
      index={0}
    />
  );

  const wrapper = shallow(component);

  it("renders", () => {
    expect(wrapper).toExist();
  });

  it("renders gif index", () => {
    expect(wrapper.find("h1").text()).toBe("# 1");
  });
});
