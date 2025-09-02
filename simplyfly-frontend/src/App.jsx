
import './App.css'
import Login from '../component/Authentication/Login'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signup from '../component/Authentication/Signup'
import PassengerPage from '../component/Passenger/PassengerPage'
import SearchFlight from '../component/Passenger/SearchFlight'
import SelectSeatPage from '../component/Passenger/SelectSeatPage'
import PaymentPage from '../component/Passenger/Payment'
import DisplayBookings from '../component/Passenger/Display-Booking'
import FlightOwnerPage from '../component/Flight_owner/FlightOwnerPage'
import AddRoute from '../component/Flight_owner/AddRoute'
import AddFlight from '../component/Flight_owner/AddFlight'
import ManageFlight from '../component/Flight_owner/ManageFlight'
import Contact from '../component/Passenger/Contact'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/passenger-dashboard" element={<PassengerPage></PassengerPage>}></Route>
      <Route path="/passenger/search-flights" element={<SearchFlight></SearchFlight>}></Route>
      <Route path="/booking" element={<SearchFlight></SearchFlight>}></Route>
      <Route path="/selectseat/:flightId/:totalSeats" element={<SelectSeatPage></SelectSeatPage>}></Route>
      <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
      <Route path="/display-bookings" element={<DisplayBookings></DisplayBookings>}></Route>
      <Route path="/booking-summary" element={<DisplayBookings></DisplayBookings>}></Route>
      <Route path="/owner-dashboard" element={<FlightOwnerPage></FlightOwnerPage>}></Route>
      <Route path="/add-route" element={<AddRoute></AddRoute>}></Route>
      <Route path="/add-flight" element={<AddFlight></AddFlight>}></Route>
      <Route path="/manage-flight" element={<ManageFlight></ManageFlight>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      
      
    
    </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App
