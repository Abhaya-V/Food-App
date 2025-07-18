import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInterceptor";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "veg",
    category: "",
    image: "",
    description: "",
    quantity: 1,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/categories/get");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/seller/foods", form);
      navigate("/seller/viewfood");
    } catch (err) {
      setError(err.response?.data?.message || "Add food failed");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center ">
      <div className="card p-4 shadow " style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
        <h3 className="text-center mb-4 text-primary">Add Food Item</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Food Name</label>
            <input
              className="form-control"
              name="name"
              placeholder="e.g., Chicken Biryani"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="e.g., 199"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select className="form-select" name="type" value={form.type} onChange={handleChange}>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={form.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              className="form-control"
              name="image"
              placeholder="Paste image URL"
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Describe the dish"
              rows="3"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold">
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
