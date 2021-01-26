import React from "react";
import Login from "../pages/Login";
import { shallow } from "@testing-library/react";

describe("Login", () => {
    it("should header component", () => {
        expect(shallow(<Login />)).toMatchSnapshot();
    });
});
