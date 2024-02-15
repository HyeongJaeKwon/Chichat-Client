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
import TextToSpeech from "./TextToSpeech";

function Sentences() {
  const [chatList, setChatList] = useState([]);
  const [selectedChatList, setSelectedChatList] = useState([]);
  // const [index, setIndex] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gpt", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        var arr = [];
        var res = [];
        response.data.res.map((v) => {
          console.log(v);
          arr = [];
          if (v.ChatMessages.length == 10) {
            for (var i = 0; i < 10; i += 2) {
              arr.push({
                prompt: v.ChatMessages[i].message,
                gpt: v.ChatMessages[i + 1].message,
                isFlipped: true,
                isShared: false,
                // id: v.ChatMessages[i].id
              });
            }
            v.ChatMessages = arr;
            res.push(v);
          }
        });

        axios
          .get("http://localhost:3001/posts/byCategory/sentence", {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((rps) => {
            console.log(rps.data);
            var arr = [];
            rps.data.map((each) => {
              arr.push(JSON.parse(each.postText).englishV);
            });

            console.log("Res is ");
            console.log(res);
            res.map((v) => {
              console.log("    " + v.ChatMessages);
              console.log(arr);
              v.ChatMessages.map((e) => {
                if (arr.includes(e.prompt)) {
                  e.isShared = true;
                }
              });
            });

            setChatList(res);
            setSelectedChatList(res);
          });
      });
  }, []);

  const handleClick = (chat, mess) => {
    setSelectedChatList(
      selectedChatList.map((v) => {
        if (v == chat) {
          v.ChatMessages.map((m) => {
            if (m == mess) {
              m.isFlipped = !m.isFlipped;
            }
          });
        }
        return v;
      })
    );
  };

  const unClick = (chat) => {
    setSelectedChatList(
      selectedChatList.indexOf(chat) != -1
        ? selectedChatList.filter((v) => {
            return v != chat;
          })
        : [...selectedChatList, chat]
    );
  };

  // m => .gpt .prompt
  // .gpt => JSON.parse(m.gpt) => .chineseV, .pronunciation .words
  const shareSentence = (chat, m) => {
    if (m.isShared) {
      alert("It's already shared");
      return;
    }
    {
      /** flipping isShared */
    }
    setSelectedChatList(
      selectedChatList.filter((v) => {
        if (chat === v) {
          v.ChatMessages.filter((e) => {
            if (e === m) {
              e.isShared = !e.isShared;
            }
            return true;
          });
        }
        return true;
      })
    );

    {
      /**making postText */
    }
    const gpt = JSON.parse(m.gpt);
    const postText = JSON.stringify({
      chineseV: gpt.chineseV,
      pronunciation: gpt.pronunciation,
      englishV: m.prompt,
      words: gpt.words,
    });
    const data = {
      title: "sentence",
      postText: postText,
    };
    const st = localStorage.getItem("accessToken");

    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // navi("/");
        console.log(response.data);
        alert("is shared");
      });
  };

  return (
    // <div class="container justify-content-center">
    <div style={{ justifyContent: "center" }}>
      <div style={{ display: "flex" }}>
        {chatList.map((v) => {
          return v.ChatMessages.length == 5 ? (
            <div
              style={{
                color:
                  selectedChatList.filter((i) => {
                    return i === v;
                  }).length > 0
                    ? "white"
                    : "black",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  border: "1px solid grey",
                  borderRadius: "10px",
                  background:
                    selectedChatList.filter((i) => {
                      return i === v;
                    }).length > 0
                      ? "darkgrey"
                      : "white",
                  margin: "10px",
                  padding: "10px 10px",
                }}
                onClick={() => unClick(v)}
              >
                Chat {v.id}
              </div>
            </div>
          ) : (
            <div>Unfinished Chat!</div>
          );
        })}
      </div>
      <p />
      <Container>
        {selectedChatList.map((v) => {
          return (
            // <div class="d-flex justify-content-center">
            <div>
              <Row style={{ marginTop: "20px" }}>
                {v.ChatMessages.map((m, key) => {
                  // console.log("hi")
                  // console.log(m.prompt.replaceAll(' ', '') == '')
                  return (
                    <div class="col-md-2">
                      <ReactCardFlip
                        isFlipped={m.isFlipped}
                        flipDirection="vertical"
                      >
                        <Card
                          style={{
                            maxWidth: "250px",
                            minHeight: "200px",
                            margin: "10px",
                            // alignItems: "flex-start"
                          }}
                        >
                          <CardContent>
                            <Typography>
                              {/* <div style={{ display: "flex", flexDirection: "column"}}> */}
                              {JSON.parse(m.gpt).chineseV}

                              {/* </div> */}
                            </Typography>
                            <Typography>
                              {/* <div style={{ display: "flex", flexDirection: "column"}}> */}
                              {JSON.parse(m.gpt).pronunciation}

                              {/* </div> */}
                            </Typography>
                            <TextToSpeech text={JSON.parse(m.gpt).chineseV} />
                            <p />
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              >
                                {/**share button */}
                                {!m.isShared ? (
                                  <button
                                    onClick={() => {
                                      shareSentence(v, m);
                                    }}
                                    class="shareCard"
                                  >
                                    Share
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      shareSentence(v, m);
                                    }}
                                    class="shareCard"
                                    style={{ background: "grey" }}
                                  >
                                    Shared!
                                  </button>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  handleClick(v, m);
                                }}
                                class="col-md-6"
                                className="flipButton"
                              >
                                English
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card
                          style={{
                            maxWidth: "250px",
                            minHeight: "200px",
                            margin: "10px",
                          }}
                        >
                          <CardContent>
                            <Typography>
                              {/* <div style={{ display: "flex", flexDirection: "column"}}> */}
                              {m.prompt.replaceAll(" ", "") == ""
                                ? "(empty)"
                                : m.prompt}

                              {/* </div> */}
                            </Typography>
                            <p />
                            <div style={{ display: "flex" }}>
                              {/**share button */}
                              {!m.isShared ? (
                                <button
                                  onClick={() => {
                                    shareSentence(v, m);
                                  }}
                                  class="shareCard"
                                >
                                  Share
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    shareSentence(v, m);
                                  }}
                                  class="shareCard"
                                  style={{ background: "grey" }}
                                >
                                  Shared!
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  handleClick(v, m);
                                }}
                                class="col-md-12"
                                className="flipButton"
                              >
                                Chinese
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </ReactCardFlip>
                    </div>
                  );
                })}
              </Row>
              <div
                // class="col-md-12"
                style={{
                  width: "90%",
                  textAlign: "center",
                  borderBottom: "3px solid #aaa",
                  lineHeight: "0.1em",
                  margin: "10px 0 20px",
                  justifyContent: "center",
                }}
              ></div>
            </div>
            // {/* </div> */}
          );
        })}
      </Container>
    </div>
    // </div>
  );
}

export default Sentences;
