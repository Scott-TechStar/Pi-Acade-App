import React, { CSSProperties } from "react";
import { User } from "../";

interface Props {
  onSignIn: () => void;
  onSignOut: () => void;
  user: User | null
  onClickSearch: () => void,
}

const headerStyle: CSSProperties = {
  padding: 8,
  backgroundColor: "green",
  color: "white",
  width: "100%",
  height:"50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Header(props: Props) {
  return (
    <header style={headerStyle}>
      <div style={{ fontWeight: "bold",color: "red" }} ><a href="/">Acade</a></div>
     
      <div style={{ fontWeight: "bold",color: "red" }}>
        <input style={{width: "50%"}} type='search' placeholder='Search For Solutions' aria-label='Search' >
        </input>
         <button onClick={props.onClickSearch} style={{ borderRadius: "30px", backgroundColor: 'lightblue' }}>
           Search
           </button>
      </div>
     
      <div>
        {props.user === null ? (
          <button onClick={props.onSignIn} style={{ borderRadius: "30px", backgroundColor: 'lightblue' }}>Login</button>
        ) : (
          <div>
            @{props.user.username} <button type="button" onClick={props.onSignOut}>Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
}
