import {
  Route,
  Routes,
} from "react-router";

import Home from "./pages/Home";
import MassageDetails from "./pages/MassageDetails";
// import Massages from "./pages/Massages";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/massages/:slug"
        element={<MassageDetails />}
      />
    </Routes>
  );
}

export default App;