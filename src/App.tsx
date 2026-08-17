import {
  Route,
  Routes,
} from "react-router";

import Home from "./pages/Home";
import MassageDetails from "./pages/MassageDetails";
import Booking from "./pages/Booking";
import Massages from "./pages/Massages";
import Journal from "./pages/Journal";
import Article from "./pages/Article";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Member from "./pages/Member";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      
      <Route
        path="/massages"
        element={<Massages />}
      />

      <Route
        path="/massages/:slug"
        element={<MassageDetails />}
      />

      <Route
        path="/booking"
        element={<Booking />}
      />

      <Route
        path="/journal"
        element={<Journal />}
      />

      <Route
        path="/journal/:slug"
        element={<Article />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/member"
        element={<Member />}
      />
    </Routes>
  );
}

export default App;