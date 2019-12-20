import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("debounce", () => ({
  debounce: (fn: Function) => fn
}));

jest
  .spyOn(window, "scrollBy")
  .mockImplementation(function(this: HTMLElement, x: number, y: number): void {
    this.scrollTop += y;
    this.scrollLeft += x;
  });

// jest
//   .spyOn(HTMLElement.prototype, "scrollBy")
//   .mockImplementation(function(this: HTMLElement, x: number, y: number): void {
//     this.scrollTop += y;
//     this.scrollLeft += x;
//   });
