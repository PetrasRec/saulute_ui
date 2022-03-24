import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Banner from ".";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Banner tests", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Banner />);
    expect(wrapper).not.toBeNull();
  });
});