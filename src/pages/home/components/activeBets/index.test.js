import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ActiveBets from ".";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Active bets tests", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ActiveBets />);
    expect(wrapper).not.toBeNull();
  });
});