import axios from "axios";
import polyline from "@mapbox/polyline";
import { addRoute_safehouse } from "./evacuation"; // Replace with the file name containing the addRoute_safehouse function

jest.mock("axios");
jest.mock("@mapbox/polyline");

describe("addRoute_safehouse Function", () => {
  const mockMap = {
    addSource: jest.fn(),
    addLayer: jest.fn(),
    getLayer: jest.fn(),
    getSource: jest.fn(() => ({ setData: jest.fn() })),
    setLayoutProperty: jest.fn(),
  };

  const disasterLocation = {
    lat: 53.338879,
    lng: -6.233875,
  };

  const safehouse = {
    _id: "64298e50ab316b690c196ddb",
    Location: {
      lat: 53.339879,
      lng: -6.235875,
    },
  };

  const mockDirectionsResponse = {
    data: {
      routes: [
        {
          geometry: "mock-geometry",
        },
      ],
    },
  };

  const mockRouteLine = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [53.338879, -6.233875],
        [53.339879, -6.235875],
      ],
    },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue(mockDirectionsResponse);
    polyline.toGeoJSON.mockReturnValue(mockRouteLine);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addRoute_safehouse adds route to the map", async () => {
    await addRoute_safehouse(mockMap, disasterLocation, safehouse);

    expect(mockMap.addSource).toHaveBeenCalled();
    expect(mockMap.addLayer).toHaveBeenCalled();
    expect(mockMap.setLayoutProperty).toHaveBeenCalledWith("evacuation_route", "visibility", "visible");
    expect(axios.get).toHaveBeenCalled();
    expect(polyline.toGeoJSON).toHaveBeenCalledWith("mock-geometry");
  });

  test("addRoute_safehouse updates existing route", async () => {
    mockMap.getLayer.mockReturnValue(true);

    await addRoute_safehouse(mockMap, disasterLocation, safehouse);

    expect(mockMap.getSource("evacuation_route").setData).toHaveBeenCalledWith(mockRouteLine);
  });
});
