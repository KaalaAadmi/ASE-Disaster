const { getNearestSafehouse } = require('./haversine');

describe('haversine.js', () => {
  it('getNearestSafehouse should return the nearest safehouse to the disaster location', () => {
    const disasterLocation = { lat: 40.7128, lng: -74.0060 }; // New York City
    const safehouses = [
      { name: 'Safehouse A', Location: { lat: 40.730610, lng: -73.935242 } }, // Safehouse A
      { name: 'Safehouse B', Location: { lat: 41.8781, lng: -87.6298 } }, // Safehouse B
      { name: 'Safehouse C', Location: { lat: 39.9526, lng: -75.1652 } }, // Safehouse C
    ];

    const nearestSafehouse = getNearestSafehouse(disasterLocation, safehouses);
    expect(nearestSafehouse.name).toEqual('Safehouse A');
  });

  it('getNearestSafehouse should return null if there are no safehouses', () => {
    const disasterLocation = { lat: 40.7128, lng: -74.0060 }; // New York City
    const safehouses = [];

    const nearestSafehouse = getNearestSafehouse(disasterLocation, safehouses);
    expect(nearestSafehouse).toBeNull();
  });
});
