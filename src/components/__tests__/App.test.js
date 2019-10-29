import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("The App component", () => {
  let wrapper = shallow(<App />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
