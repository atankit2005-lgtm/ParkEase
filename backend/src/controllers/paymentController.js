import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const {
      booking,
      amount,
      paymentMethod,
      transactionId,
    } = req.body;

    // Check booking exists
    const existingBooking = await Booking.findById(booking);

    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Create payment
    const payment = await Payment.create({
      booking,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus: "Success",
    });

    res.status(201).json({
      success: true,
      message: "Payment Successful",
      payment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("booking");

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Payment By ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("booking");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
