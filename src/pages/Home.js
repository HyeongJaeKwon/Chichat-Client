import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from 'react-router-dom'

function Home() {
  const [listofPosts, setListofPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navi = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navi("/login");
    } else {
      axios
        .get("https://ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListofPosts(response.data.listofPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (pId) => {
    axios
      .post(
        "https://ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com/like",
        { PostId: pId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListofPosts(
          listofPosts.map((post) => {
            if (post.id === pId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const arr = post.Likes;
                arr.pop();
                return { ...post, Likes: arr };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(pId)) {
          setLikedPosts([
            likedPosts.filter((id) => {
              return id != pId;
            }),
          ]);
        } else {
          setLikedPosts([...likedPosts, pId]);
        }
      });
  };

  return (
    <div>
      {listofPosts.map((value, key) => {
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
              <div className="username"><Link to={`/profile/${value.UserId}`}>{value.userName}</Link></div>
              <div className="buttons">
                <ThumbUpIcon
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                />
              </div>

              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
