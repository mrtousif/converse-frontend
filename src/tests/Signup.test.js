import React from "react";
import Signup from "../pages/Signup";
import { shallow } from "@testing-library/react";

describe("Signup", () => {
    it("should header component", () => {
        expect(shallow(<Signup />)).toMatchSnapshot();
    });
});
