import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInterceptor";
import { useNavigate, useParams } from "react-router-dom";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  const fetchFood = async () => {
    try {
      const res = await axiosInstance.get(`/seller/foods/${id}`);
      setForm({
        ...res.data,
        category: res.data.category?._id || res.data.category, 
      });
    } catch (err) {
      setError("Failed to load food item");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/categories/get");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchFood();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/seller/foods/${id}`, form);
      navigate("/seller/viewfood");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update food");
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
        <h3 className="text-center mb-4 text-warning">Edit Food Item</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Food Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
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
            <input className="form-control" name="image" value={form.image} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="3" value={form.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" name="quantity" min="0" value={form.quantity} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFood;
