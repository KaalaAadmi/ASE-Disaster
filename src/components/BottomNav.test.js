import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BottomNav from "./BottomNav"; // Replace with the correct path to your BottomNav component

describe("BottomNav Component", () => {
  test("renders News component initially", () => {
    render(<BottomNav />);
    expect(screen.getByText(/News/i)).toBeInTheDocument();
  });

  test("switches between News and Map components on BottomNavigationAction clicks", () => {
    render(<BottomNav />);
    const newsButton = screen.getByLabelText("News");
    const mapButton = screen.getByLabelText("Map");

    // Click on the Map button
    fireEvent.click(mapButton);
    expect(screen.getByText(/Map/i)).toBeInTheDocument();
    expect(screen.queryByText(/News/i)).not.toBeInTheDocument();

    // Click on the News button
    fireEvent.click(newsButton);
    expect(screen.getByText(/News/i)).toBeInTheDocument();
    expect(screen.queryByText(/Map/i)).not.toBeInTheDocument();
  });
});
