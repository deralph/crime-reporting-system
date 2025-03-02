import React from "react";
import "./Card.css"; // Import the CSS file

export default function ComplainCard({
  category,
  createdBy,
  description,
  status,
  address,
  additionalInfo,
  createdAt,
}) {
  return (
    <div className="complain-card">
      <div className="card-header">
        <h2>{category}</h2>
      </div>
      <div className="card-body">
        <p className="description">{description}</p>
        <div className="card-footer">
          <div>
            <strong>📍 Address:</strong> {address}
          </div>
          <div>
            <strong>ℹ️ Additional Info:</strong> {additionalInfo}
          </div>
          <div className={`status ${status.toLowerCase()}`}>
            🟢 Status: {status}
          </div>
          <div>
            <strong>📅 Created At:</strong> {createdAt}
          </div>
          <div>
            <strong>👤 Created By:</strong> {createdBy}
          </div>
        </div>
      </div>
    </div>
  );
}
