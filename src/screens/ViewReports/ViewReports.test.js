import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewReports from "./ViewReports";
import { getReports } from "../../api/Report";

jest.mock("../../api/Report");

describe("ViewReports Component", () => {
  beforeEach(() => {
    getReports.mockResolvedValue([
      {
        _id: "64298e50ab316b690c196ddb",
        // ... rest of the data properties
      },
    ]);

    // Mock local storage
    Storage.prototype.getItem = jest.fn(() => "token");
  });

  test("renders ViewReports component and checks for elements", () => {
    render(<ViewReports />);
    expect(screen.getByText("VIEW REPORTS")).toBeInTheDocument();
  });

  test("displays access denied message when not authenticated", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    render(<ViewReports />);
    expect(screen.getByText("ACCESS DENIED")).toBeInTheDocument();
  });

  test("renders Table component with report data", async () => {
    render(<ViewReports />);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent("Fire in the gasworks office building");
  });
});
