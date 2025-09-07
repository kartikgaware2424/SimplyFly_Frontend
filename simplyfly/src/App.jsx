
import './App.css'

import Login from '../component/authentication/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Regsiter from '../component/authentication/Register'
import PassengerPage from '../component/passanger/PassengerPage'
import SearchFlight from '../component/passanger/SearchFlight'
import FlightSearchPage from '../component/passanger/FlightSearchPage'
import BookingConfirmation from '../component/passanger/BookingConfirmation'
import SeatSelectionPage from '../component/passanger/SeatSelectionPage'
import PaymentPage from '../component/passanger/PaymentPage'
import MyBookings from '../component/passanger/MyBookings'
import Profile from '../component/passanger/Profile'
import Logout from '../component/passanger/Logout'
import BookTicket from '../component/passanger/BookTicket'
import FlightOwnerPage from '../component/flightowner/FlightOwnerPage'
import RouteList from '../component/flightowner/RouteList'
import AddRoute from '../component/flightowner/AddRoute'
import AddFlight from '../component/flightowner/AddFlight'
import UpdateFlightPage from '../component/flightowner/UpdateFlightPage'
import OwnerFlightsPage from '../component/flightowner/OwnerFlightsPage'
import GetBooking from '../component/flightowner/GetBooking'
import FlightBooking from '../component/flightowner/FlightBooking'
import AdminDashBoard from '../component/admin/AdminDashBoard'
import Signup from '../component/admin/Signup'
import AdminUsersPage from '../component/admin/AdminUsersPage'
import AdminPassengersPage from '../component/admin/AdminPassengersPage'
import AdminOwnersPage from '../component/admin/AdminOwnersPage'
import AdminAdminsPage from '../component/admin/AdminAdminsPage'
import ManageRoute from '../component/admin/ManageRoute'
import RefundPage from '../component/flightowner/RefundPage'
import Refund from '../component/admin/Refund'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Regsiter></Regsiter>}></Route>
          <Route path="/passenger" element={<PassengerPage />} />

          <Route path="/owner-dashboard" element={<FlightOwnerPage />} />
          {/* <Route path="/admin" element={<AdminPage />} /> */}

          <Route path="/search-flights" element={<FlightSearchPage />} />
          <Route path="/book/:flightId/:totalSeats" element={<SeatSelectionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/booking-summary" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/booking" element={<BookTicket />} />
          <Route path="/route-list" element={<RouteList />} />
          <Route path="/add-route" element={<AddRoute />} />
          <Route path="/add-flight/:routeId" element={<AddFlight />} />
         
          <Route path="/passenger/search-flights" element={ <SearchFlight />} />
          
          <Route path="/manage-flight" element={<OwnerFlightsPage />} />
          <Route path="/update-flight/:id" element={<UpdateFlightPage />} />
          <Route path="/myflight-booking" element={<GetBooking />} />
          <Route path="/flight-booking/:flightId" element={<FlightBooking />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/admin-register" element={<Signup />} />
          <Route path="/manage-user" element={<AdminUsersPage />} />
          <Route path="/admin-passengers" element={<AdminPassengersPage />} />
          <Route path="/admin-owners" element={<AdminOwnersPage />} />
          <Route path="/admin-admins" element={<AdminAdminsPage />} />
          <Route path="/manage-route" element={<ManageRoute />} />
          <Route path="/manage-refund" element={<RefundPage />} />
          <Route path="/manage-adminrefund" element={<Refund />} />
          
          
         
          
          
          
         

          
         
          
        </Routes>



      </BrowserRouter>


    </>
  )
}

export default App
