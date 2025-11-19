import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading";

export default function SpacecraftPage() {
  // get id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // local state
  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);

  // load spacecraft details when the id changes
  useEffect(() => {
    async function load() {
      try {
        const data = await SpaceTravelApi.getSpacecraftById({ id });
        setShip(data);
      } catch (err) {
        console.error("Failed to load spacecraft", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <Loading />;

  if (!ship) {
    return (
      <div style={{ padding: "2rem" }}>
        <button onClick={() => navigate(-1)}>← Back</button>
        <p>Spacecraft not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{ship.name}</h1>
      <p>
        <strong>Capacity:</strong> {ship.capacity}
      </p>
      <p>
        <strong>Description:</strong> {ship.description}
      </p>
    </div>
  );
}
