import React from "react";
import { shallow } from "enzyme";
import Ending from "../Ending";

let mockedPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockedPush,
  }),
}));

describe("The Home component", () => {
  let props = { location: { state: { charactersCount: 254, seconds: 46 } } };
  let wrapper = shallow(<Ending {...props} />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calculates the words per minute correctly", () => {
    expect(wrapper.find(".wpm-score").text()).toEqual("Your WPM: 66");
  });

  describe("when the button to try again is clicked", () => {
    it("redirects to the home page", () => {
      wrapper.find(".try-again-button").simulate("click");
      expect(mockedPush).toHaveBeenCalledWith("/race");
    });
  });
});
