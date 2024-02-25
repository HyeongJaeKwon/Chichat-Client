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
// import { useState } from 'react';
import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ExitBtn = styled(ModalBtn)`
  background-color: #3498db;
  border-radius: 15px;
  text-decoration: none;
  margin: 0px 10px 0px auto;
  padding: 5px 6px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 600px;
  padding: 10px 0px 50px 0px;
  background-color: #ffffff;
  > div.desc {
    margin: 8px;
    font-size: 17px;
    color: var(--coz-purple-600);
  }
`;

function Home() {
  const [listofPosts, setListofPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [addedPosts, setAddedPosts] = useState([]);
  let navi = useNavigate();
  const { authState } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };

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
    if (!authState.status) {
      alert("Sign in to like");
    } else {
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

        {/** lets get started pop up modal */}
        <>
          <ModalContainer>
            {isOpen ? (
              <ModalBackdrop onClick={openModalHandler}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <ExitBtn onClick={openModalHandler}>X</ExitBtn>
                  <div className="desc">
                    1. Sign up to have your own account
                  </div>
                  <div className="desc">
                    2. Type any sentences you want to learn
                  </div>
                  <div className="desc">
                    3. For every five sentences, flash cards for vocabs and
                    sentences get created!
                  </div>
                  <div className="desc">
                    4. Share your flash cards with your community!
                  </div>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </ModalContainer>
        </>

        {/**Lets get started part */}
        {!authState.status && (
          <Container
            style={{
              margin: "0 auto",
              width: "600px",
              background: "white",
              borderRadius: "15px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                margin: "10px 0px",
                background: "white",
                textAlign: "center",
                padding: "5px 0px",
              }}
            >
              Let's learn how to do self-paced learning with ChiChat!
            </div>
            <button
              style={{
                width: "fit-content",
                background: "#3498db",
                margin: "auto",
                height: "fit-content",
                padding: "7px 25px",
                borderRadius: "15px",
                fontWeight: "bold",
                margin: "5px 5px",
              }}
              onClick={openModalHandler}
            >
              Get started
            </button>
          </Container>
        )}

        {/**main content part */}
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
                {/** each cell */}
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
