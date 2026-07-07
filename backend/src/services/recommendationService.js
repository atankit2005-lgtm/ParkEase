const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const recommendParking = (parkingLots, userLat, userLng) => {
  return parkingLots
    .map((lot) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        lot.latitude,
        lot.longitude
      );

      const score =
        (lot.availableSlots * 2) -
        distance -
        (lot.pricePerHour || 0) * 0.5;

      return {
        ...lot,
        distance,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);
};

export default recommendParking;
