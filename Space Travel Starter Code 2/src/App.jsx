import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SpacecraftsPage from "./pages/SpacecraftsPage";
import SpacecraftPage from "./pages/SpacecraftPage";
import SpacecraftBuildPage from "./pages/SpacecraftBuildPage";
import PlanetsPage from "./pages/PlanetsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/spacecrafts/new" element={<SpacecraftBuildPage />} />
        <Route path="/spacecrafts/:id" element={<SpacecraftPage />} />

      <Route path="/planets" element={<PlanetsPage />} />


        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
