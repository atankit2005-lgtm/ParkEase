import ParkingLot from "../models/ParkingLot.js";

// Create Parking Lot
export const createParkingLot = async (req, res) => {
  try {
    const parkingLot = await ParkingLot.create(req.body);

    res.status(201).json({
      success: true,
      message: "Parking Lot Created Successfully",
      parkingLot,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Parking Lots
export const getAllParkingLots = async (req, res) => {
  try {
    const parkingLots = await ParkingLot.find();

    res.status(200).json({
      success: true,
      count: parkingLots.length,
      parkingLots,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Parking Lot By ID
export const getParkingLotById = async (req, res) => {
  try {
    const parkingLot = await ParkingLot.findById(req.params.id);

    if (!parkingLot) {
      return res.status(404).json({
        success: false,
        message: "Parking Lot Not Found",
      });
    }

    res.status(200).json({
      success: true,
      parkingLot,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Parking Lot
export const updateParkingLot = async (req, res) => {
  try {
    const parkingLot = await ParkingLot.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!parkingLot) {
      return res.status(404).json({
        success: false,
        message: "Parking Lot Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Parking Lot Updated Successfully",
      parkingLot,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Parking Lot
export const deleteParkingLot = async (req, res) => {
  try {
    const parkingLot = await ParkingLot.findByIdAndDelete(req.params.id);

    if (!parkingLot) {
      return res.status(404).json({
        success: false,
        message: "Parking Lot Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Parking Lot Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};