import Booking from "../models/Booking.js";
import ParkingLot from "../models/ParkingLot.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      user,
      parkingLot,
      bookingDate,
      startTime,
      endTime,
      totalAmount,
      vehicleNumber
    } = req.body;

    // Check Parking Lot
    const lot = await ParkingLot.findById(parkingLot);

    if (!lot) {
      return res.status(404).json({
        success: false,
        message: "Parking Lot Not Found",
      });
    }

    // Check Slot Availability
    if (lot.availableSlots <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Slots Available",
      });
    }

    // Create Booking
    const booking = await Booking.create({
      user,
      parkingLot,
      bookingDate,
      startTime,
      endTime,
      totalAmount,
      vehicleNumber,
    });

    // Reduce Available Slots
    lot.availableSlots -= 1;
    await lot.save();

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Bookings of One User
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
    })
      .populate("parkingLot")
      .populate("user");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    // Increase available slots again
    const parkingLot = await ParkingLot.findById(booking.parkingLot);

    if (parkingLot) {
      parkingLot.availableSlots += 1;
      await parkingLot.save();
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};