import { shallow } from "enzyme";
import * as React from "react";
import App from "./App";

const createTestProps = (props: object) => ({
    ...props
});

describe("App", () => {
    const props = createTestProps({});
    const wrapper = shallow(<App {...props} />);

    describe("renders text boxes", (): void => {
        it("should render a <TextInput />", () => {
            expect(wrapper.find("TextInput")).toHaveLength(1);
        });
    });

    describe("sets state", (): void => {
        it("should set the state", () => {
            wrapper.setState({mame: 'lol'})
            expect(wrapper.find("TextInput")).toHaveLength(1);
        });
    });
});
