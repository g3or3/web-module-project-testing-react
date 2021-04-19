import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import fetchShow from "../../api/fetchShow";

jest.mock("../../api/fetchShow");

const testShow = {
	name: "name",
	summary: "summary",
	seasons: [{ id: 1, name: "name", episodes: [] }],
};

const { getByRole, findByTestId, queryAllByTestId } = screen;

it("renders without props passed in", () => {
	render(<Display />);
});

it("show component displays when fetch button is clicked", async () => {
	fetchShow.mockResolvedValueOnce(testShow);
	const mockDisplayFunc = jest.fn();

	render(<Display displayFunc={mockDisplayFunc} />);

	userEvent.click(getByRole("button"));

	expect(await findByTestId("show-container")).toBeInTheDocument();

	expect(queryAllByTestId("season-option")).toHaveLength(1);

	expect(mockDisplayFunc).toHaveBeenCalled();
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
