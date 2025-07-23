import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  seats: [{
    type: Number,
    required: true,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],
    default: 'booked',
  },
  passengerDetails: [{
    name: String,
    age: Number,
    gender: String,
    seatNumber: Number,
  }],
  contactNumber: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);