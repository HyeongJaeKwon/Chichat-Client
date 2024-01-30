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
    axios.get(`https://ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/auth/basicinfo/${uId}`).then((res) => {
      setUserName(res.data.userName);
    });
    axios.get(`https://ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/posts/byUserId/${uId}`).then((res) => {
      setLop(res.data);
    });
  }, []);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <h1>
          {" "}
          UserName: {userName}
          {authState.userName === userName && (
            <button onClick={()=> {navi("/changepassword")}}>Change my password</button>
          )}
        </h1>
      </div>
      <div className="listOfPosts">
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
