import { useGifsStore } from "./useGifsStore";
import { FakeGiphyAPI } from "../../api/GiphyAPI/FakeGiphyAPI";
import { renderHook, act } from "@testing-library/react-hooks";

describe(useGifsStore, () => {
  const api = new FakeGiphyAPI();

  describe("fetchNewBatch", () => {
    it("fetches and saves gifs", async () => {
      const hook = renderHook(() => useGifsStore(api, 20));

      await act(() => {
        return hook.result.current.fetchNewBatch("kitty");
      });

      expect(hook.result.current.gifs.length).toBe(20);
    });

    it("replaces current set of gifs", async () => {
      const hook = renderHook(() => useGifsStore(api, 40));

      await act(() => {
        return hook.result.current.fetchNewBatch("kitty");
      });

      const old = hook.result.current.gifs;

      expect(hook.result.current.gifs.length).toBe(40);

      await act(() => {
        return hook.result.current.fetchNewBatch("doggy");
      });

      expect(old).not.toMatchObject(hook.result.current.gifs);
    });
  });

  describe("fetchNextBatch", () => {
    it("fetches and accumulates gifs", async () => {
      const hook = renderHook(() => useGifsStore(api, 20));

      for (let i = 1; i <= 5; i++) {
        await act(() => {
          return hook.result.current.fetchNextBatch("kitty");
        });

        expect(hook.result.current.gifs.length).toBe(20 * i);
      }
    });
  });
});
