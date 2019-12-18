import "@testing-library/jest-dom/extend-expect";

jest.mock("debounce", () => ({
  debounce: (fn: Function) => fn
}));
