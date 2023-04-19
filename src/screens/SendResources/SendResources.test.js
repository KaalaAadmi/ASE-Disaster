import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SendResources from "./SendResources";
import { getActiveDisasters, getIndividualDisaster } from "../../api/Disaster";

jest.mock("../../api/Disaster");

describe("SendResources Component", () => {
  beforeEach(() => {
    getActiveDisasters.mockResolvedValue([
      { _id: "1", disasterName: "Disaster 1" },
      { _id: "2", disasterName: "Disaster 2" },
    ]);

    getIndividualDisaster.mockResolvedValue({
      disasterData: {
        ambulance: "5",
        fire: "3",
        police: "4",
        bus: "2",
        helicopter: "1",
      },
    });

    // Mock local storage
    Storage.prototype.getItem = jest.fn(() => "true");
  });

  test("renders SendResources component and checks for elements", () => {
    render(<SendResources />);
    expect(screen.getByText("Send Resources")).toBeInTheDocument();
    expect(screen.getByText("Select Disaster:")).toBeInTheDocument();
    expect(screen.getByText("Number of Ambulances to send")).toBeInTheDocument();
    expect(screen.getByText("Number of Fire Engines to send")).toBeInTheDocument();
    expect(screen.getByText("Number of Garda Units to send")).toBeInTheDocument();
    expect(screen.getByText("Number of Helicopters to sent:")).toBeInTheDocument();
    expect(screen.getByText("Evacuation required:")).toBeInTheDocument();
  });

  test("displays disasters in dropdown and populates fields on selection", async () => {
    render(<SendResources />);

    const disasterDropdown = screen.getByRole("combobox");
    fireEvent.change(disasterDropdown, { target: { value: "1" } });

    expect(await screen.findByDisplayValue("5")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("3")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("4")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("2")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("1")).toBeInTheDocument();
  });
});
