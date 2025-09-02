import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMsg("⚠️ Please fill in all fields!");
      return;
    }

    setMsg("✅ Thank you for contacting us! We’ll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2>🛫 Contact Us ✈️</h2>
        <p className="text-muted">
          We’d love to hear from you — whether it’s feedback, queries, or travel stories 🛬
        </p>
      </div>

      <div className="card shadow-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">👤 Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">📧 Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">📝 Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">💬 Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          {msg && <div className="alert alert-info">{msg}</div>}

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{ background: "linear-gradient(45deg, #1e3c72, #2a5298)", color: "#fff" }}
          >
            ✈️ Send Message
          </button>
        </form>
      </div>

     
      <button
        className="btn w-100 mt-3"
        style={{ background: "linear-gradient(45deg, #1e3c72, #2a5298)", color: "#fff" }}
        onClick={() => navigate("/passenger-dashboard")}
      >
        🏠 Home
      </button>
    </div>
  );
}
