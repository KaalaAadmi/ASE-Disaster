import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisasterInformation from "./DisasterInformation";

// Mock the API calls
jest.mock("../../api/Disaster", () => ({
  getActiveDisasters: jest.fn().mockResolvedValue([]),
  getIndividualDisaster: jest.fn().mockResolvedValue({ disasterData: {} }),
  activateDisaster: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../api/Order", () => ({
  disasterOrders: jest.fn().mockResolvedValue([]),
}));

describe("DisasterInformation component", () => {
  it("renders without crashing", () => {
    render(<DisasterInformation />);
  });

  it("shows access denied message for non-coordinator users", () => {
    localStorage.setItem("isAdmin", false);
    render(<DisasterInformation />);
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });

  it("renders the component for coordinator users", () => {
    localStorage.setItem("isAdmin", true);
    render(<DisasterInformation />);
    expect(screen.getByText("Disaster Information")).toBeInTheDocument();
  });

  it("renders a dropdown with available disasters", async () => {
    localStorage.setItem("isAdmin", true);
    render(<DisasterInformation />);
    const dropdown = screen.getByRole("combobox", { name: /select report grouping/i });
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue("");
  });

  it("handles dropdown change", async () => {
    localStorage.setItem("isAdmin", true);
    render(<DisasterInformation />);
    const dropdown = screen.getByRole("combobox", { name: /select report grouping/i });

    userEvent.selectOptions(dropdown, "test-value");
    expect(dropdown).toHaveValue("test-value");
  });
});
