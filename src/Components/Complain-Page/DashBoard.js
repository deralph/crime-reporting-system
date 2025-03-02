import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { Services } from "../../Constant/Services";
import { useNavigate } from "react-router-dom";
import ComplainCard from "../Complain-detail-card/ComplainCard";
import { listComplain } from "../../firebase-service/complain-service";
import { useAuth } from "../Contexts/AuthContext";

export default function DashBoard() {
  const [complainList, setComplainList] = useState();
  const {
    currentUser: { email },
  } = useAuth();

  // useNavigate use hua hai ek page se dushre page pe jane k liya
  const navigate = useNavigate();
  function navigateToCreateComplainPage(category) {
    console.log(category);
    navigate(`/${category}/create-complain`);
  }
  useEffect(() => {
    listComplain(email).then((res) => setComplainList(res));
  }, [email]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="complains-container">
        <b className="title">Lodge Your Complaint / Request</b>
        <div className="complain-grid">
          {Services.map((category) => (
            <div
              key={category.name}
              onClick={() => navigateToCreateComplainPage(category.name)}
              className="complain-item"
            >
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      {complainList?.length > 0 && (
        <div
          style={{ marginTop: "30px" }}
          className="text-centre pt-3 complain-page"
        >
          <p>Your Open Complain/Request</p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {complainList?.map((complain) => (
              <ComplainCard {...complain} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
