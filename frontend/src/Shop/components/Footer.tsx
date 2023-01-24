import React, { CSSProperties } from "react";
import { User } from "../";

interface Props {
  onAccount: () => void;
  onProfile: () => void;
  user: User | null
}

const footerStyle: CSSProperties = {
  padding: 8,
  backgroundColor: "green",
  color: "white",
  width: "100%",
  height:"50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Footer(props: Props) {
  return (
    <footer style={footerStyle}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"/>
      <div style={{ fontWeight: "bold",color: "red" }} ><a href="/">Orders</a></div>
     
     
      <div>
        {props.user === null ? (
          <button onClick={props.onAccount} style={{ borderRadius: "30px", backgroundColor: 'lightblue' }}>Account</button>
        ) : (
          <div>
            @{props.user.username} <button type="button" onClick={props.onProfile}>Profile</button>
          </div>
        )}
      </div>
    </footer>
  );
}
