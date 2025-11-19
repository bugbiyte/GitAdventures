import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 Space Travel Command Center</h1>
      <p>Welcome, Commander. Humanity depends on your strategy.</p>

      <ul>
        <li><Link to="/spacecrafts">View All Spacecraft</Link></li>
        <li><Link to="/spacecrafts/new">Build New Spacecraft</Link></li>
        <li><Link to="/planets">Manage Planets</Link></li>
      </ul>
    </div>
  );
}
