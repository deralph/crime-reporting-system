import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateComplainPage.css"; // Import the CSS file
import { createComplain } from "../../firebase-service/complain-service";
import { useAuth } from "../Contexts/AuthContext";

export default function CreateComplainPage() {
  const { category } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleCreateCard = async () => {
    const details = {
      category,
      description,
      address,
      additionalInfo,
      status: "open",
      createdAt: new Date().toLocaleString(),
      createdBy: currentUser.email,
    };
    await createComplain(details);
    navigate("/dashboard");
  };

  return (
    <div className="complain-container">
      <h2 className="title">Create Your Complaint</h2>
      <div className="complain-form">
        <textarea
          className="form-input"
          placeholder="Enter description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <textarea
          className="form-input"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <textarea
          className="form-input"
          placeholder="Enter additional information"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        ></textarea>

        <button className="submit-btn" onClick={handleCreateCard}>
          Submit Complaint
        </button>
      </div>
    </div>
  );
}
