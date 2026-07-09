import ParkingLot from "../models/ParkingLot.js";
import recommendParking from "../services/recommendationService.js";

export const getParkingRecommendations = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required.",
      });
    }

    const parkingLots = await ParkingLot.find();

    const recommendations = recommendParking(
      parkingLots,
      Number(latitude),
      Number(longitude)
    );

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations.",
    });
  }
};
