import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoutes from "./privateRoutes";
import Home from "../pages/Home";
import DragNdropFileInput from "../components/shared/DragNdropFileInput";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import CSVreader from "../components/shared/CSVreader";
import NavigationBar from "../components/shared/NavigationBar";
import SocietyFeed from "../components/society/SocietyFeed";
import Logout from "../components/logout/Logout";
import ResidentProfile from "../pages/ResidentProfile";
import ResidentsPage from "../pages/ResidentsPage";
import ResidenceRegisterPage from "../pages/ResidentRegisterPage";
import WingsPage from "../pages/WingsPage";
import PropertyPage from "../pages/PropertyPage";
import BookingsPage from "../pages/BookingsPage";
import BookingDetailsPage from "../pages/BookingDetailsPage";
import SocietyDetailsPage from "../pages/SocietyDetailsPage";
import EventsPage from "../pages/EventsPage";
import ProfilePage from "../pages/ProfilePage";
import EventDetailsPage from "../pages/EventDetailsPage";
import PaymentPage from "../pages/PaymentPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/society-register" element={<Register />} />
        <Route path="/register" element={<ResidenceRegisterPage />} />

        <Route path="/" element={<PrivateRoutes component={NavigationBar} />}>
          <Route index element={<Home />} />
          <Route path="/wing-feed" element={<Home />} />

          {/* society routes */}
          <Route path="/society" element={<SocietyDetailsPage />} />

          {/* events routes */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />

          {/* residents routes */}
          <Route path="/residents" element={<ResidentsPage />} />
          <Route path="/residents/:userId" element={<ProfilePage />} />

          {/* wings routes */}
          <Route path="/wings" element={<WingsPage />} />

          {/* properties routes */}
          <Route path="/properties" element={<PropertyPage />} />

          {/* bookings routes */}
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookings/:bookingId" element={<BookingDetailsPage />} />

          {/* payments route */}
          <Route path="/payments" element={<PaymentPage />} />

          {/* logout route */}
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* (404) not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
