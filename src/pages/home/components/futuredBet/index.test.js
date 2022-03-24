import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from ".";
import FuturedBet from ".";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Featured bets tests", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FuturedBet />);
    expect(wrapper).not.toBeNull();
  });
});