import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar"; // Replace with the correct path to your Navbar component

describe("Navbar Component", () => {
  // Helper function to mock localStorage
  const setLocalStorage = (auth, coord) => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (key) => {
          if (key === "token" && auth) return "sample_token";
          if (key === "isAdmin" && coord) return "true";
          return null;
        },
      },
      writable: true,
    });
  };

  test("renders public Navbar when not authenticated", () => {
    setLocalStorage(false, false);
    render(<Navbar />);
    expect(screen.getByText(/DISASTRO/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Report Disaster/i)).toBeInTheDocument();
    expect(screen.queryByText(/View Reports/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Message HQ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Disaster Information/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Activate Response/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Send Resources/i)).not.toBeInTheDocument();
  });

  test("renders responder Navbar when authenticated but not coordinator", () => {
    setLocalStorage(true, false);
    render(<Navbar />);
    expect(screen.getByText(/DISASTRO/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Report Disaster/i)).toBeInTheDocument();
    expect(screen.getByText(/View Reports/i)).toBeInTheDocument();
    expect(screen.queryByText(/Message HQ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Disaster Information/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Activate Response/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Send Resources/i)).not.toBeInTheDocument();
  });

  test("renders coordinator Navbar when authenticated and coordinator", () => {
    setLocalStorage(true, true);
    render(<Navbar />);
    expect(screen.getByText(/DISASTRO/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Report Disaster/i)).toBeInTheDocument();
    expect(screen.getByText(/View Reports/i)).toBeInTheDocument();
    expect(screen.getByText(/Message HQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Disaster Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Activate Response/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Resources/i)).toBeInTheDocument();
  });
});
