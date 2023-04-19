import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateDisaster from "./CreateDisaster";
import { activateDisaster, getPendingDisasters, getIndividualDisaster } from "../../api/Disaster";

// Mock the API calls
jest.mock("../../api/Disaster");

// Sample data
const mockPendingDisasters = [
  { _id: "1", disasterName: "Disaster 1" },
  { _id: "2", disasterName: "Disaster 2" },
];

const mockIndividualDisaster = {
  disasterData: {
    type: "Flood",
    radius: "100",
    site: "Urban",
    size: "50",
    disasterName: "Disaster 1",
    disasterDescription: "Severe flooding in the city.",
  },
};

describe("CreateDisaster component", () => {
  beforeEach(() => {
    localStorage.setItem("isAdmin", "true");

    getPendingDisasters.mockResolvedValue(mockPendingDisasters);
    getIndividualDisaster.mockResolvedValue(mockIndividualDisaster);
  });

  afterEach(() => {
    localStorage.removeItem("isAdmin");
  });

  test("renders the component and submits the form", async () => {
    render(<CreateDisaster />);

    const selectDisaster = screen.getByLabelText(/Select Report Grouping:/i);
    expect(selectDisaster).toBeInTheDocument();

    fireEvent.change(selectDisaster, { target: { value: "1" } });

    await waitFor(() => {
      expect(getIndividualDisaster).toHaveBeenCalledWith("1");
    });

    const type = screen.getByLabelText(/Select Disaster Type:/i);
    expect(type).toBeInTheDocument();
    fireEvent.change(type, { target: { value: "Flood" } });

    const radius = screen.getByLabelText(/Radius Impacted \(in meters\)/i);
    expect(radius).toBeInTheDocument();
    fireEvent.change(radius, { target: { value: "100" } });

    const size = screen.getByLabelText(/Number of People Impacted/i);
    expect(size).toBeInTheDocument();
    fireEvent.change(size, { target: { value: "50" } });

    const site = screen.getByLabelText(/Select Disaster Site:/i);
    expect(site).toBeInTheDocument();
    fireEvent.change(site, { target: { value: "Urban" } });

    const disasterName = screen.getByLabelText(/Name/i);
    expect(disasterName).toBeInTheDocument();
    fireEvent.change(disasterName, { target: { value: "Disaster 1" } });

    const disasterDetails = screen.getByLabelText(/Description/i);
    expect(disasterDetails).toBeInTheDocument();
    fireEvent.change(disasterDetails, { target: { value: "Severe flooding in the city." } });

    const submitButton = screen.getByRole("button", { name: "" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(activateDisaster).toHaveBeenCalledWith(
        "1",
        "Flood",
        "100",
        "50",
        "Urban",
        "Disaster 1",
        "Severe flooding in the city."
      );
    });
  });
});
