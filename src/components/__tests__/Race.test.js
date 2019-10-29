import React from "react";
import { shallow } from "enzyme";
import Race from "../Race";

jest.useFakeTimers();

describe("The Race component", () => {
  let wrapper = shallow(<Race />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("when the component mounts", () => {
    it("the paragraph text and its length in state are not empty", () => {
      expect(wrapper.state().text.length).toBeGreaterThan(0);
      expect(wrapper.state().initialTextLength).toBeGreaterThan(0);
    });

    it("the seconds timer runs correctly", () => {
      let seconds = 5;
      let milliseconds = seconds * 1000;
      jest.advanceTimersByTime(milliseconds);
      expect(wrapper.state().seconds).toEqual(seconds);
    });
  });
  describe("when the component unmounts", () => {
    it("stops the timer", () => {
      wrapper.unmount();
      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
