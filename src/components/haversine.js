function getNearestSafehouse(disasterLocation, safehouses) {
  let nearestDistance = Infinity;
  let nearestSafehouse = null;
  for (let i = 0; i < safehouses.length; i++) {
    const safehouse = safehouses[i];
    const distance = getDistance(disasterLocation, safehouse.Location);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestSafehouse = safehouse;
    }
  }
  return nearestSafehouse;
}

function getDistance(location1, location2) {
  const lat1 = location1.lat;
  const lon1 = location1.lng;
  const lat2 = location2.lat;
  const lon2 = location2.lng;
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // in metres
  return d;
}

module.exports = {
  getNearestSafehouse,
};
