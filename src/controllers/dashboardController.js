import User from "../models/User.js";
import ParkingLot from "../models/ParkingLot.js";
import Booking from "../models/Booking.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalParkingLots = await ParkingLot.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const availableSlots = await ParkingLot.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$availableSlots" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalParkingLots,
        totalBookings,
        availableSlots:
          availableSlots.length > 0 ? availableSlots[0].total : 0,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};