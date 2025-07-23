import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  seatCapacity: {
    type: Number,
    required: true,
    default: 40,
  },
  fare: {
    type: Number,
    required: true,
  },
  amenities: [{
    type: String,
  }],
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
    default: 'Non-AC',
  },
  date: {
    type: Date,
    required: true,
  },
  bookedSeats: [{
    type: Number,
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Bus || mongoose.model('Bus', busSchema);