import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading";

export default function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // spacecraftId -> targetPlanetId
  const [selectedDestinations, setSelectedDestinations] = useState({});

  // load planets + spacecraft together
  useEffect(() => {
    async function load() {
      try {
        const [planetsData, spacecraftsData] = await Promise.all([
          SpaceTravelApi.getPlanets(),
          SpaceTravelApi.getSpacecrafts(),
        ]);

        console.log("PLANETS:", planetsData);
        console.log("SPACECRAFTS:", spacecraftsData);

        setPlanets(planetsData);
        setSpacecrafts(spacecraftsData);
      } catch (err) {
        console.error("Failed to load planets/spacecrafts", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function handleDestinationChange(spacecraftId, planetId) {
    setSelectedDestinations((prev) => ({
      ...prev,
      [spacecraftId]: planetId,
    }));
  }

  async function handleDispatch(spacecraft) {
    const targetPlanetId = selectedDestinations[spacecraft.id];

    if (!targetPlanetId) {
      alert("Please choose a destination planet.");
      return;
    }

    // ensure destination differs from currentLocation
    if (Number(targetPlanetId) === spacecraft.currentLocation) {
      alert("Destination must be different from the current planet.");
      return;
    }

    try {
      await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId: spacecraft.id,
        targetPlanetId: Number(targetPlanetId),
      });

      // reload data to reflect updated locations / populations
      const [planetsData, spacecraftsData] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);

      setPlanets(planetsData);
      setSpacecrafts(spacecraftsData);
    } catch (err) {
      console.error("Failed to send spacecraft", err);
      alert("Failed to send spacecraft. Check the console for details.");
    }
  }

  if (loading) return <Loading />;
  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        Error loading planets: {String(error)}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🪐 Planets & Stationed Spacecraft</h1>

      {planets.map((planet) => {
        // find all spacecraft currently on this planet
        const stationedShips = spacecrafts.filter(
          (s) => s.currentLocation === planet.id
        );

        return (
          <section
            key={planet.id}
            style={{
              border: "1px solid #444",
              margin: "1rem 0",
              padding: "1rem",
            }}
          >
            <h2>{planet.name}</h2>
            <p>
              Current population:{" "}
              <strong>{planet.currentPopulation}</strong>
            </p>

            {stationedShips.length === 0 ? (
              <p>No spacecraft stationed here.</p>
            ) : (
              stationedShips.map((ship) => (
                <div
                  key={ship.id}
                  style={{
                    border: "1px solid #777",
                    margin: "0.5rem 0",
                    padding: "0.5rem",
                  }}
                >
                  <strong>{ship.name}</strong> (capacity {ship.capacity})
                  <div>
                    <label>
                      Send to:{" "}
                      <select
                        value={selectedDestinations[ship.id] || ""}
                        onChange={(e) =>
                          handleDestinationChange(
                            ship.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select planet</option>
                        {planets
                          .filter((p) => p.id !== planet.id)
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                      </select>
                    </label>
                    <button onClick={() => handleDispatch(ship)}>
                      Dispatch
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        );
      })}
    </div>
  );
}
