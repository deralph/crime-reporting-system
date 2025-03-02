import React, { useEffect, useState } from "react";
import {
  fetchComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../../firebase-service/complain-service";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      const data = await fetchComplaints();
      setComplaints(data);
    };
    getComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateComplaintStatus(id, newStatus);
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
  };

  const handleDelete = async (id) => {
    await deleteComplaint(id);
    setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard - Complaint Management</h2>
      <div className="complaint-list">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h3>{complaint.category}</h3>
              <p>
                <strong>Description:</strong> {complaint.description}
              </p>
              <p>
                <strong>Address:</strong> {complaint.address}
              </p>
              <p>
                <strong>Additional Info:</strong> {complaint.additionalInfo}
              </p>
              {/* <p>
                <strong>Created By:</strong> {complaint.createdBy}
              </p> */}
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-${complaint.status.toLowerCase()}`}>
                  {complaint.status}
                </span>
              </p>
              <div className="buttons">
                <select
                  value={complaint.status}
                  onChange={(e) =>
                    handleStatusChange(complaint.id, e.target.value)
                  }
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(complaint.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-complaints">No complaints found.</p>
        )}
      </div>
    </div>
  );
}
