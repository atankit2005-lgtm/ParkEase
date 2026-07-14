import mongoose from "mongoose";

const parkingLotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    totalSlots: {
      type: Number,
      required: true,
    },

    availableSlots: {
      type: Number,
      required: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    openingTime: {
      type: String,
      default: "00:00",
    },

    closingTime: {
      type: String,
      default: "23:59",
    },

    image: {
      type: String,
      default: "",
    },
    coveredParking: {
  type: Boolean,
  default: false,
},

evCharging: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ParkingLot", parkingLotSchema);