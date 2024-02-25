import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const nav = useNavigate();

  const diveIn = () => {
    nav("/home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/** get started  */}
      <div
        style={{
          width: "100%",
          alignItems: "center",
          background: "rgb(46, 56, 56)",
          display: "flex",
          flexDirection: "column",
          height: "500px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            background: "rgb(46, 56, 56)",
            maxHeight: "1000px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "50px", fontWeight: "bold", color: "white" }}>
            Learn Chinese with customized sentences
          </div>

          <div style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>
            Share your learning with community
          </div>

          <button
            style={{
              background: "grey",
              padding: "10px 25px",
              borderRadius: "23px",
              margin: "40px auto",
              display: "inline-block",
              color: "white",
              fontWeight: "bold",
              width: "fit-content",
            }}
            onClick={diveIn}
          >
            Dive in
          </button>
        </div>
      </div>

      {/**misc info */}
      <div
        style={{
          width: "100%",
          alignItems: "end",
          background: "rgb(46, 56, 56)",
          // background:"blue",
          display: "flex",
          //   flexDirection: "column",
          height: "400px",
          justifyContent: "flex-end",
          padding: "0px 40px",
        }}
      >
        <div
          style={{
            height: "300px",
            background: "rgb(46, 56, 56)",
            width: "25%",
            color: "white",
            justifyContent: "start",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{ paddingTop: "40px", fontWeight: "bold", fontSize: "40px" }}
          >
            ChiChat
          </div>
          <button
            style={{
              width: "fit-content",
              background: "rgb(46, 156, 156)",
              borderRadius: "15px",
              height: "fit-content",
              padding: "10px 10px",
              color: "black",
              fontWeight: "bold",
              marginTop: "20px",
            }}
            onClick={diveIn}
          >
            Get started
          </button>
        </div>

        <div
          style={{
            height: "300px",
            background: "rgb(46, 56, 56)",
            width: "25%",
            color: "white",
          }}
        >
          <div
            style={{
              padding: "10px 0px",
              color: "white",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            About
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Who we are
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Supported App
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Support
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Career
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Ethics
          </div>
        </div>

        <div
          style={{
            height: "300px",
            background: "rgb(46, 56, 56)",
            width: "25%",
            color: "white",
          }}
        >
          <div
            style={{
              padding: "10px 0px",
              color: "white",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            Info
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            FAQ
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Terms of Service
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Privacy Policy
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Refund Policy
          </div>
        </div>

        <div
          style={{
            height: "300px",
            background: "rgb(46, 56, 56)",
            width: "25%",
          }}
        >
          <div
            style={{
              padding: "10px 0px",
              color: "white",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            Contact
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Email
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Office
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Instagram
          </div>
          <div
            style={{ padding: "10px 0px", color: "white", fontWeight: "500" }}
          >
            Facebook
          </div>
        </div>
      </div>

      <div style={{ background: "rgb(46, 56, 56)" , justifyContent:"center", alignItems:"center", display:"flex"}}>
        {" "}
        <div
          style={{
            color: "white",
            // margin: "auto auto",
            background: "rgb(46, 56, 56)",
            padding:"20px 0px",
            fontSize:"17px"
          }}
        >
          © 2024 ChiChat. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Main;
