import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import { Badge, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fontSize } from "@mui/system";
import TextToSpeech from "../components/TextToSpeech";

function Home() {
  const [listofPosts, setListofPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [addedPosts, setAddedPosts] = useState([]);
  let navi = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      axios.get("http://localhost:3001/posts/noId").then((response) => {
        var newLop = response.data.listofPosts.map((each) => {
          each.isFlipped = false;
          return each;
        });

        setListofPosts(newLop);
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
      // navi("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          var newLop = response.data.listofPosts.map((each) => {
            each.isFlipped = false;
            return each;
          });

          setListofPosts(newLop);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
          setAddedPosts(
            response.data.addedPosts.map((each) => {
              return each.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (pId) => {
    if(!authState.status){
alert("Sign in to like")
    }else{
      axios
      .post(
        "http://localhost:3001/like",
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
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != pId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, pId]);
        }
      });
    }
    
  };

  const flipPost = (keyV) => {
    setListofPosts(
      listofPosts.filter((each, key) => {
        if (key === keyV) {
          each.isFlipped = !each.isFlipped;
        }
        return true;
      })
    );
  };

  const addToAdded = (postId) => {
    if (!authState.status) {
      alert("Sign in to add");
    } else {
      axios
        .post(
          "http://localhost:3001/add",
          { PostId: postId },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          {
            /**maually updating addedposts  */
          }
          if (addedPosts.includes(postId)) {
            setAddedPosts(
              addedPosts.filter((id) => {
                return id != postId;
              })
            );
          } else {
            setAddedPosts([...addedPosts, postId]);
          }
        });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "2",
          top: "0",
          left: "0",
          width: "100%",
          background: "rgb(240, 240, 240)",
        }}
      >
        <Container
          style={{
            margin: "0 auto",
            width: "600px",
            background: "white",
            borderRadius: "15px",
          }}
        >
          {listofPosts.map((value, key) => {
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    padding: "7px",
                    margin: "3px",
                    display: "flex",
                    background: "white",
                  }}
                >
                  {/** category : sentence or word */}
                  <div
                    style={{
                      color: "black",
                      padding: "0px 5px 5px 5px",
                      borderRadius: "10px",
                      margin: "auto 5px auto 5px",
                    }}
                  >
                    <i>{value.title}</i>
                  </div>

                  {/*username*/}
                  <div
                    style={{
                      color: "black",
                      padding: "0px 5px 5px 5px",
                      // background: "red",
                      borderRadius: "10px",
                      margin: "auto 5px auto 5px",
                    }}
                  >
                    <Link
                      to={`/profile/${value.UserId}`}
                      style={{ color: "black", textDecorationLine: "none" }}
                    >
                      {value.userName}
                    </Link>
                    {/* {value.isFlipped.toString()} */}
                  </div>

                  {/*english sentence  or word */}
                  <button className="hoverButton" onClick={() => flipPost(key)}>
                    {value.title === "sentence" ? (
                      <h6>{JSON.parse(value.postText).englishV}</h6>
                    ) : (
                      <h6>{JSON.parse(value.postText).words[1]}</h6>
                    )}
                  </button>

                  {/*like ubtton*/}
                  <div className="buttons">
                    <ThumbUpIcon
                      className={
                        likedPosts.includes(value.id)
                          ? "unlikeBttn"
                          : "likeBttn"
                      }
                      onClick={() => {
                        likeAPost(value.id);
                      }}
                    />
                    <label>{value.Likes.length}</label>
                  </div>
                </div>

                {/**when showing chinese sentence or word*/}
                {value.isFlipped && (
                  <div
                    style={{
                      padding: "7px",
                      border: "1px solid black",
                      borderRadius: "10px",
                      margin: "3px auto 3px auto",
                      display: "flex",
                      background: "lightgrey",
                      width: "max-content",
                      maxWidth: "600px",
                    }}
                  >
                    {value.title === "sentence" ? (
                      <div>
                        <div>{JSON.parse(value.postText).chineseV}</div>
                        <div>{JSON.parse(value.postText).pronunciation}</div>
                      </div>
                    ) : (
                      <div>
                        <div>{JSON.parse(value.postText).words[0]}</div>
                        <div>{JSON.parse(value.postText).words[2]}</div>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      {addedPosts.includes(value.id) ||
                      value.UserId === authState.id ? (
                        <div
                          style={{
                            display: "inline-block",
                            // padding: "5px 10px",
                            backgroundColor: "purple",
                            color: " #ffffff",
                            border: "none",
                            borderRadius: "10px",
                            width: "auto",
                            padding: "0px 5px ",
                            fontSize: "14px",
                            height: "25px",
                            marginLeft: "auto",
                          }}
                        >
                          Added
                        </div>
                      ) : (
                        <button
                          style={{
                            display: "inline-block",
                            // padding: "5px 10px",
                            backgroundColor: "#3498db",
                            color: " #ffffff",
                            border: "none",
                            borderRadius: "10px",
                            width: "auto",
                            padding: "0px 5px ",
                            fontSize: "14px",
                            height: "25px",
                            marginLeft: "auto",
                          }}
                          onClick={() => {
                            addToAdded(value.id);
                          }}
                        >
                          Add
                        </button>
                      )}
                      {value.title === "sentence" ? (
                        <TextToSpeech
                          text={JSON.parse(value.postText).chineseV}
                        />
                      ) : (
                        <TextToSpeech
                          text={JSON.parse(value.postText).words[0]}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    height: "1px",
                    width: "550px",
                    margin: "0px auto",
                    backgroundColor: "lightgrey",
                  }}
                ></div>
              </div>
            );
          })}
        </Container>
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "rgb(240, 240, 240)",
          position: "absolute",
          zIndex: "1",
          top: "0",
          left: "0",
        }}
      ></div>
    </div>
  );
}

export default Home;
