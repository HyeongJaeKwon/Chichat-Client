import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userName, setUserName] = useState("");
  const [lop, setLop] = useState([]);
  let { uId } = useParams();
  const { authState } = useContext(AuthContext);
  let navi = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${uId}`).then((res) => {
      setUserName(res.data.userName);
    });
    axios.get(`http://localhost:3001/posts/byUserId/${uId}`).then((res) => {
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
          <text style={{marginTop:"auto", marginBottom:"auto", marginRight:"10px"}}> User Name:</text>
          <text style={{marginTop:"auto", marginBottom:"auto" , fontWeight:"bold"}}>{userName}</text>
          {authState.userName === userName && (
            <button
              onClick={() => {
                navi("/changepassword");
              }}
              style={{padding:"5px", width:"fit-content", borderRadius:"10px", height:"fit-content", margin:"10px", fontSize:"12px", justifyContent:"center"}}
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
                  navi(`/post/${value.id}`);
                }}
              >
                {value.title}
              </div>
              <div
                className="body"
                onClick={() => {
                  navi(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.userName}</div>
                <div className="buttons">
                  {/* <ThumbUpIcon
                    className={
                      likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                    }
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                  /> */}
                </div>

                <label>{value.Likes.length}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
