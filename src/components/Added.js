import React from "react";
import { Badge, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { Carousel } from "3d-react-carousal";
import TextToSpeech from "./TextToSpeech";

function Added() {
  const [postList, setPostList] = useState([]);
  const { authState } = useContext(AuthContext);
  const arrr = [
    <div>3</div>,
    <div>3</div>,
    <div>3</div>,
    <div>3</div>,
    <div>3</div>,
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3001/add", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        var newLop = response.data.addedList.map((each) => {
          each.isFlipped = false;
          each.expand = false;
          return each;
        });
        setPostList(newLop);
      });
  }, []);

  const flipPost = (keyV) => {
    setPostList(
      postList.filter((each, key) => {
        if (key === keyV) {
          each.isFlipped = !each.isFlipped;
          if (!each.isFlipped) {
            each.expand = false;
          }
        }
        return true;
      })
    );
  };

  const learnMore = (vid) => {
    console.log(postList[0].expand);
    setPostList(
      postList.filter((each, key) => {
        if (key === vid) {
          each.expand = !each.expand;
        }
        return true;
      })
    );
  };
  const callback = function (index) {
    console.log("callback", index);
  };

  return (
    <div>
      <Container
        style={{
          margin: "0px auto 0px auto",
          width: "600px",
          background: "white",
          borderRadius: "15px",
          position: "relative",
          zIndex: "2",
        }}
      >
        {postList.map((value, key) => {
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
                {/*english sentence*/}
                <button className="hoverButton" onClick={() => flipPost(key)}>
                  {value.title === "sentence" ? (
                    <h6>{JSON.parse(value.postText).englishV}</h6>
                  ) : (
                    <h6>{JSON.parse(value.postText).words[1]}</h6>
                  )}
                </button>

                {/*like ubtton*/}
                {/* <div className="buttons">
                  <ThumbUpIcon
                    className={
                      likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                    }
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                  />
                  <label>{value.Likes.length}</label>
                </div> */}
              </div>

              {/**when showing chinese  word and pronun!
               */}
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
                  {/**chinese and pronunciation */}
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

                  {/**learn more button  */}
                  {value.title === "sentence" ? (
                    <div style={{ display: "flex", justifyContent: "flex-end" , flexDirection:"column", marginLeft: "10px"}}>
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
                          learnMore(key);
                        }}
                      >
                        Learn words
                      </button>

                      <TextToSpeech
                        text={JSON.parse(value.postText).chineseV}
                      />
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "flex-end" , flexDirection:"column", marginLeft: "10px"}}>
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
                          learnMore(key);
                        }}
                      >
                        Learn Sentence
                      </button>

                      <TextToSpeech
                        text={JSON.parse(value.postText).words[0]}
                      />
                    </div>
                  )}
                </div>
              )}

              {/**when showing learn more  */}
              {value.expand &&
                (value.title === "sentence" ? (
                  <Carousel
                    slides={JSON.parse(value.postText).words.map((each) => {
                      return (
                        <Card
                          //   variant="outlined"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            minWidth: "200px",
                            width: "400px",
                            height: "150px",
                            margin: "0px 0px",
                            padding: "0px 0px",
                            // position: "relative",
                            // overflow: "hidden",
                            background: "white",
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {each[0]}
                            </Typography>

                            <Typography
                              sx={{ fontSize: 14, color: "blue" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {each[1]}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {each[2]}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                    autoplay={false}
                    interval={1000}
                    onSlideChange={callback}
                  />
                ) : (
                  <Card
                    //   variant="outlined"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      minWidth: "200px",
                      width: "400px",
                      // height: "150px",
                      margin: "0px auto",
                      padding: "0px 0px",
                      // position: "relative",
                      // overflow: "hidden",
                      background: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {JSON.parse(value.postText).englishV}
                      </Typography>

                      <Typography
                        sx={{ fontSize: 17, color: "blue" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {JSON.parse(value.postText).chineseV}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {JSON.parse(value.postText).pronunciation}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              {/* {value.expand && (
                <div>{
                    JSON.parse(value.postText).words.map((each)=>{
                        return <div>
                            <div>{each[0]}</div>
                            </div>
                    })
                }
                </div>
              )} */}

              {/** bottom line */}
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
  );
}

export default Added;
