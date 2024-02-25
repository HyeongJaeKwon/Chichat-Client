import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Profile() {
  const [userName, setUserName] = useState("");
  const [lop, setLop] = useState([]);
  let { uId } = useParams();
  const { authState } = useContext(AuthContext);
  let navi = useNavigate();

  useEffect(() => {
    axios.get(`https://chichat-b5ef36ed707d.herokuapp.com/auth/basicinfo/${uId}`).then((res) => {
      setUserName(res.data.userName);
    });
    axios.get(`https://chichat-b5ef36ed707d.herokuapp.com/posts/byUserId/${uId}`).then((res) => {
      setLop(res.data);
    });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <div>
        <div
          style={{
            display: "flex",
            // margin: "0px auto 0px auto",
            background: "white",
            justifyContent: "center",
            padding: "0px",
          }}
        >
          {/* <text style={{marginTop:"auto", marginBottom:"auto", marginRight:"10px"}}> User Name:</text> */}
          <text
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {userName}
          </text>
          {authState.userName === userName && (
            <button
              onClick={() => {
                navi("/changepassword");
              }}
              style={{
                padding: "5px",
                width: "fit-content",
                borderRadius: "10px",
                height: "fit-content",
                margin: "10px",
                fontSize: "12px",
                justifyContent: "center",
                textDecoration: "underline",
                background: "white",
              }}
            >
              Change my password
            </button>
          )}
        </div>
      </div>

      <div>
        {lop.map((value, key) => {
          return (
            <div className="post">
              <div
                className="title"
                onClick={() => {
                  // navi(`/post/${value.id}`);
                }}
              >
                {value.title}
              </div>
              <div
                className="body"
                onClick={() => {
                  // navi(`/post/${value.id}`);
                }}
                style={{ alignItems: "center" }}
              >
                {/* {value.postText} */}
                {value.title === "sentence" ? (
                  <div style={{ alignItems: "center" }}>
                    {JSON.parse(value.postText).chineseV && (
                      <div
                        style={{
                          fontWeight: "bold",
                          margin: "auto auto",
                          fontSize: "18px",
                        }}
                      >
                        {JSON.parse(value.postText).chineseV}
                      </div>
                    )}
                    {JSON.parse(value.postText).pronunciation && (
                      <div
                        style={{
                          margin: "auto auto",
                          fontSize: "15px",
                          color: "grey",
                        }}
                      >
                        {JSON.parse(value.postText).pronunciation}
                      </div>
                    )}
                    {JSON.parse(value.postText).englishV && (
                      <div
                        style={{
                          margin: "auto auto",
                          fontSize: "16px",
                          color: "black",
                          marginTop: "5px",
                        }}
                      >
                        {JSON.parse(value.postText).englishV}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ alignItems: "center" }}>
                    {JSON.parse(value.postText).words && (
                      <div
                        style={{
                          fontWeight: "bold",
                          margin: "auto auto",
                          fontSize: "18px",
                        }}
                      >
                        {JSON.parse(value.postText).words[0]}
                      </div>
                    )}
                    {JSON.parse(value.postText).words && (
                      <div
                        style={{
                          margin: "auto auto",
                          fontSize: "15px",
                          color: "grey",
                        }}
                      >
                        {JSON.parse(value.postText).words[1]}
                      </div>
                    )}
                    {JSON.parse(value.postText).words && (
                      <div
                        style={{
                          margin: "auto auto",
                          fontSize: "16px",
                          color: "black",
                          marginTop: "5px",
                        }}
                      >
                        {JSON.parse(value.postText).words[2]}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="footer">
                <div className="username">{value.userName}</div>
                <div className="buttons">
                  <ThumbUpIcon
                    className={"unlikeBttn"}
                    onClick={() => {
                      // likeAPost(value.id);
                    }}
                    style={{ background: "rgb(82, 94, 106)", color: "white" }}
                  />
                </div>

                <label style={{ margin: "auto 10px" }}>
                  {value.Likes.length}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
