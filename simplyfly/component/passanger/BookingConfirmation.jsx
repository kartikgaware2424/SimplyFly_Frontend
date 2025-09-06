import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const { booking } = useLocation().state;

  return (
    <div className="container py-4 text-center">
      <h3>Booking Confirmed!</h3>
      <p>Booking ID: {booking.bookingId}</p>
      <p>Total Amount Paid: ₹{booking.totalAmount}</p>
      <p>Status: {booking.status}</p>
      <p>Seats: {booking.bookedSeatIds.join(', ')}</p>
      <p>Thank you for booking with SimpliFly ✈️</p>
    </div>
  );
};

export default BookingConfirmation;
