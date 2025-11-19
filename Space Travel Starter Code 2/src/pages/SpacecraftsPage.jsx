// src/pages/SpacecraftsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading";

export default function SpacecraftsPage() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await SpaceTravelApi.getSpacecrafts();
      setShips(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleDelete(id) {
    const ok = window.confirm("Decommission this spacecraft?");
    if (!ok) return;

    await SpaceTravelApi.destroySpacecraftById({ id });
    setShips((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) return <Loading />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛰 All Spacecraft</h1>

      <p>
        <Link to="/spacecrafts/new">+ Build New Spacecraft</Link>
      </p>

      {ships.map((s) => (
        <div
          key={s.id}
          style={{
            border: "1px solid #444",
            margin: "1rem 0",
            padding: "1rem",
          }}
        >
          <h2>{s.name}</h2>
          <p>Capacity: {s.capacity}</p>
          <p>{s.description}</p>

          <p>
            <Link to={`/spacecrafts/${s.id}`}>View Details</Link>
          </p>
          <button onClick={() => handleDelete(s.id)}>
            Decommission
          </button>
        </div>
      ))}
    </div>
  );
}
