import { renderHook, act } from "@testing-library/react-hooks";
import { useWindowSize } from "./useWindowSize";

describe(useWindowSize, () => {
  it("provides windows inner width and height", () => {
    const hook = renderHook(() => useWindowSize());

    expect(hook.result.current).toMatchObject({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  it("updates state on window resize", async () => {
    const hook = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 200 });
      Object.defineProperty(window, "innerHeight", { value: 300 });
      window.dispatchEvent(new Event("resize"));
    });

    expect(hook.result.current).toMatchObject({
      width: 200,
      height: 300
    });
  });
});
