import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";

export default function SpacecraftBuildPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    capacity: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.capacity) errs.capacity = "Capacity is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newShip = await SpaceTravelApi.buildSpacecraft({
      name: form.name,
      capacity: Number(form.capacity),
      description: form.description,
    });

    navigate(`/spacecrafts/${newShip.id}`);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>🛠 Build a New Spacecraft</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name*</label><br />
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Capacity*</label><br />
          <input name="capacity" type="number" value={form.capacity} onChange={handleChange} />
          {errors.capacity && <p style={{ color: "red" }}>{errors.capacity}</p>}
        </div>

        <div>
          <label>Description*</label><br />
          <textarea name="description" value={form.description} onChange={handleChange} />
          {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        </div>

        <button>Build Spacecraft</button>
      </form>
    </div>
  );
}
