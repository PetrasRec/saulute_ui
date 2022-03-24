import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BetForm from ".";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Bet form tests", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BetForm />);
    expect(wrapper).not.toBeNull();
  });
});