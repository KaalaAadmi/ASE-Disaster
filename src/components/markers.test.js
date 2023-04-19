import * as markers from './Markers';
import mapboxgl from 'mapbox-gl';

jest.mock('mapbox-gl', () => ({
  Marker: jest.fn().mockImplementation(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    togglePopup: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
  })),
  Popup: jest.fn().mockImplementation(() => ({
    setText: jest.fn().mockReturnThis(),
  })),
}));

const mockMap = {
  current: {},
};

describe('markers.js', () => {
  afterEach(() => {
    mapboxgl.Marker.mockClear();
    mapboxgl.Popup.mockClear();
  });

  it('createDisasterMarker should create disaster markers on the map', () => {
    const disasterDataset = [
      { latitude: 40.7128, longitude: -74.0060, detail: 'Disaster 1' },
    ];

    markers.createDisasterMarker(disasterDataset, mockMap);

    expect(mapboxgl.Marker).toHaveBeenCalledTimes(1);
    expect(mapboxgl.Popup).toHaveBeenCalledTimes(1);
  });

  it('createSafeHouseMarker should create safehouse markers on the map', () => {
    const safehouseLocations = [
      { Name: 'Safehouse 1', Location: { lat: 40.7128, lng: -74.0060 } },
    ];

    markers.createSafeHouseMarker(safehouseLocations, mockMap);

    expect(mapboxgl.Marker).toHaveBeenCalledTimes(1);
    expect(mapboxgl.Popup).toHaveBeenCalledTimes(1);
  });

  // Add similar tests for createHospitalMarker, createGardaMarker, and createFirestationMarker

  it('clearMarkers should remove all markers from the map', () => {
    const markerInstance = {
      remove: jest.fn(),
    };

    mapboxgl.Marker.mockReturnValue(markerInstance);

    const safehouseLocations = [
      { Name: 'Safehouse 1', Location: { lat: 40.7128, lng: -74.0060 } },
    ];

    markers.createSafeHouseMarker(safehouseLocations, mockMap);
    markers.clearMarkers();

    expect(markerInstance.remove).toHaveBeenCalledTimes(1);
  });
});
