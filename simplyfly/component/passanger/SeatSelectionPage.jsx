import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SeatSelectionPage() {
    const { flightId, totalSeats } = useParams();
    const totalSeatsNum = parseInt(totalSeats, 10);
    const navigate = useNavigate();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [msg, setMsg] = useState("");

    // Config
    const BUSINESS_ROWS = 4;
    const BUSINESS_FARE = 5000;
    const ECONOMY_FARE = 2000;

    useEffect(() => {
       
        const generatedSeats = generateSeats(totalSeatsNum, flightId);
        setSeats(generatedSeats);
    }, [flightId, totalSeatsNum]);

    
    const generateSeats = (totalSeats, flightId) => {
        const seatLetters = ["A", "B", "C", "D", "E", "F"];
        let seatsArr = [];
        for (let i = 1; i <= totalSeats; i++) {
            const row = Math.ceil(i / seatLetters.length);
            const letter = seatLetters[(i - 1) % seatLetters.length];
            const seatClass = row <= BUSINESS_ROWS ? "Business" : "Economy";
            const fare = seatClass === "Business" ? BUSINESS_FARE : ECONOMY_FARE;

            seatsArr.push({
                seat_id: null, // not yet in DB
                seat_number: `${row}${letter}`,
                is_booked: false,
                seat_class: seatClass,
                fare: fare,
                flight_id: flightId,
                booking_id: null
            });
        }
        return seatsArr;
    };

    const handleSelectSeat = async (seat) => {
        if (seat.is_booked) {
            setMsg(`Seat ${seat.seat_number} is already booked. Please select another seat.`);
            return;
        }

        // toggle local selection
        if (selectedSeats.includes(seat.seat_number)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat.seat_number));
        } else {
            setSelectedSeats([...selectedSeats, seat.seat_number]);

            // Save to backend only when first selected
            if (!seat.seat_id) {
                const token = localStorage.getItem("jwtToken");
                try {
                    const seatDto = {
                        seatNumber: seat.seat_number,
                        booked: false,
                        seatClass: seat.seat_class,
                        flightId: seat.flight_id,
                        bookingId: null
                    };

                    // const res = await axios.post(
                    //     "http://localhost:8080/api/seats/add",
                    //     seatDto,
                    //     { headers: { Authorization: `Bearer ${token}` } }
                    // );

                     const res = await SeatService.addSeat(seatDto, token);

                    // update local state with generated seat_id
                    setSeats(prev =>
                        prev.map(s =>
                            s.seat_number === seat.seat_number
                                ? { ...s, seat_id: res.data.seat_id }
                                : s
                        )
                    );
                } catch (err) {
                    console.error("Error saving seat to backend:", err);
                    setMsg("Error saving seat to backend!");
                }
            }
        }
    };

    const proceedToPayment = () => {
        if (selectedSeats.length === 0) {
            setMsg("Please select at least one seat!");
            return;
        }
        const passengerId = localStorage.getItem("userId");
        navigate("/payment", {
            state: {
                flightId,
                selectedSeats,
                passengerId,
                totalAmount: selectedSeats.reduce(
                    (sum, s) => sum + seats.find(seat => seat.seat_number === s).fare,
                    0
                )
            }
        });
    };

    const getSeatButtonClass = (seat) => {
        if (seat.is_booked) return "btn btn-danger"; // booked
        if (selectedSeats.includes(seat.seat_number)) return "btn btn-primary"; // selected
        return seat.seat_class === "Business" ? "btn btn-warning" : "btn btn-outline-success";
    };

    // Group seats by row
    const rows = {};
    seats.forEach(seat => {
        if (seat?.seat_number) {
            const rowNumberMatch = seat.seat_number.match(/\d+/);
            if (rowNumberMatch) {
                const rowNumber = rowNumberMatch[0];
                if (!rows[rowNumber]) rows[rowNumber] = [];
                rows[rowNumber].push(seat);
            }
        }
    });

    const rowNumbers = Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b));

    const totalBooked = seats.filter(s => s.is_booked).length;
    const totalRemaining = totalSeatsNum - totalBooked;

    return (
        <div
            className="container my-5 p-5 rounded"
            style={{
                backgroundImage: "url('https://thealviator.com/wp-content/uploads/2024/08/IMG_4216-scaled.jpeg')",
                backgroundSize: "cover",
                color: "white",
            }}
        >
            <h2 className="text-center mb-4">✈️ Choose Your Dream Seat ✈️</h2>
            <p className="text-center mb-4" style={{ fontStyle: 'italic' }}>
                Luxury in Business, Comfort in Economy. Select your perfect seat!
            </p>

            {msg && <div className="alert alert-warning">{msg}</div>}

            {/* Seat Stats */}
            <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap">
                <div className="bg-dark p-3 rounded text-center">
                    <strong>Total Seats</strong>
                    <div>{totalSeatsNum}</div>
                </div>
                <div className="bg-danger p-3 rounded text-center">
                    <strong>Booked Seats</strong>
                    <div>{totalBooked}</div>
                </div>
                <div className="bg-success p-3 rounded text-center">
                    <strong>Remaining Seats</strong>
                    <div>{totalRemaining}</div>
                </div>
            </div>

            {/* Selected Seats */}
            {selectedSeats.length > 0 && (
                <div className="mb-4">
                    <h5>🪑 Selected Seats:</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {selectedSeats.map(seat => {
                            const fare = seats.find(s => s.seat_number === seat)?.fare;
                            return (
                                <span
                                    key={seat}
                                    className="badge bg-primary p-2"
                                    style={{ fontSize: '1rem' }}
                                >
                                    {seat} - ₹{fare}
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Seats Layout */}
            <div className="bg-grey p-4 rounded">
                {rowNumbers.map(rowNumber => (
                    <div key={rowNumber} className="d-flex justify-content-center mb-2 align-items-center">
                        <div style={{ width: '30px' }} className="text-center me-2">
                            <strong>{rowNumber}</strong>
                        </div>
                        <div className="d-flex gap-2">
                            {rows[rowNumber].map(seat => (
                                <button
                                    key={seat.seat_number}
                                    className={`btn ${getSeatButtonClass(seat)}`}
                                    style={{ width: '70px', height: '60px', borderRadius: '12px', fontWeight: 'bold' }}
                                    onClick={() => handleSelectSeat(seat)}
                                    disabled={seat.is_booked}
                                    title={`Seat: ${seat.seat_number} (${seat.seat_class}) Fare: ₹${seat.fare}`}
                                >
                                    {seat.seat_number}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Proceed Button */}
            <div className="mt-4 text-center">
                <button
                    className="btn btn-success btn-lg"
                    onClick={proceedToPayment}
                    disabled={selectedSeats.length === 0}
                >
                    💳 Proceed to Payment ({selectedSeats.length})
                </button>
            </div>

            <p className="text-center mt-3" style={{ fontStyle: 'italic' }}>
                Pro Tip: Business class seats are front rows with premium comfort. Economy seats are cozy and affordable.
            </p>
        </div>
    );
}
