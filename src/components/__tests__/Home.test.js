import React from "react";
import { shallow } from "enzyme";
import Home from "../Home";

let mockedPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockedPush
  })
}));

describe("The Home component", () => {
  let wrapper = shallow(<Home />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe("when .start-button is clicked", () => {
    it("redirects to the '/race' page", () => {
      wrapper.find(".start-button").simulate("click");
      expect(mockedPush).toHaveBeenCalledWith("/race");
    });
  });
});
