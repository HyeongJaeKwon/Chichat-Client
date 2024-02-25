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

function Words() {
  const [chatList, setChatList] = useState([]);
  const [selectedChatList, setSelectedChatList] = useState([]);
  // const [index, setIndex] = useState(-1);

  useEffect(() => {
    axios
      .get("https://chichat-b5ef36ed707d.herokuapp.com/gpt", {
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
              var wordarr = [];
              const jparse = JSON.parse(v.ChatMessages[i + 1].message);
              var each = {
                chineseV: jparse.chineseV,
                englishV: v.ChatMessages[i].message,
                pronunciation: jparse.pronunciation,
              };
              jparse.words.map((unoword) => {
                wordarr.push({
                  oneWord: unoword,
                  isFlipped: true,
                  isShared: false,
                });
              });
              each.words = wordarr;
              arr.push(each);
            }
            v.ChatMessages = arr;
            res.push(v);
          }
        });

        axios
          .get("https://chichat-b5ef36ed707d.herokuapp.com/posts/byCategory/word", {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((rps) => {
            var arr = [];
            rps.data.map((each) => {
              arr.push(JSON.parse(each.postText).words[2]);
            });

            res.map((v) => {
              v.ChatMessages.map((each) => {
                {
                  /**five each s */
                }
                each.words.map((uno) => {
                  if (arr.includes(uno.oneWord[2])) {
                    uno.isShared = true;
                  }
                });
              });
            });

            console.log(res);
            setChatList(res);
            setSelectedChatList(res);
          });

        // axios
        //   .get("https://chichat-b5ef36ed707d.herokuapp.com/posts/byCategory/word", {
        //     headers: { accessToken: localStorage.getItem("accessToken") },
        //   })
        //   .then((rps) => {
        //     console.log(rps.data);
        //     var arr = [];
        //     rps.data.map((each) => {
        //       arr.push(JSON.parse(each.postText).englishV);
        //     });

        //     console.log("Res is ");
        //     console.log(res);
        //     res.map((v) => {
        //       console.log("    " + v.ChatMessages);
        //       console.log(arr);
        //       v.ChatMessages.map((e) => {
        //         if (arr.includes(e.prompt)) {
        //           e.isShared = true;
        //         }
        //       });
        //     });

        //     setChatList(res);
        //     setSelectedChatList(res);
        //   });
      });
  }, []);

  const handleClick = (chat, sentence, mess) => {
    setSelectedChatList(
      selectedChatList.map((v) => {
        if (v == chat) {
          v.ChatMessages.map((s) => {
            if (s == sentence) {
              s.words.map((m) => {
                if (m === mess) {
                  m.isFlipped = !m.isFlipped;
                }
              });
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

  const shareSentence = (chat, sentence, m) => {
    if (m.isShared) {
      alert("It's already shared");
      return;
    }

    // setSelectedChatList(
    //   selectedChatList.filter((v) => {
    //     if (chat === v) {
    //       v.ChatMessages.filter((e) => {
    //         if (e === m) {
    //           e.isShared = !e.isShared;
    //         }
    //         return true;
    //       });
    //     }
    //     return true;
    //   })
    // );
    setSelectedChatList(
      selectedChatList.filter((c) => {
        if (c === chat) {
          c.ChatMessages.filter((s) => {
            if (s === sentence) {
              s.words.filter((w) => {
                if (w === m) {
                  w.isShared = !w.isShared;
                }
                return true;
              });
            }
            return true;
          });
        }
        return true;
      })
    );

    {
      /**sentence has .chineseV .pronunciation .englishV .words */
    }
    {
      /**m is one of the element in .words */
    }
    {
      /**m has oneWord [ , , ] and isFlipped */
    }
    // const gpt = JSON.parse(m.gpt);
    console.log(sentence.englishV);
    const postText = JSON.stringify({
      chineseV: sentence.chineseV,
      pronunciation: sentence.pronunciation,
      englishV: sentence.englishV,
      words: m.oneWord,
    });
    // console.log(postText)
    const data = {
      title: "word",
      postText: postText,
    };
    const st = localStorage.getItem("accessToken");
    axios
      .post("https://chichat-b5ef36ed707d.herokuapp.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("shared");
        // navi("/");
        console.log("shareword");
        console.log(response.data);
      });
  };

  return (
    // <div class="container justify-content-center">
    <div style={{ justifyContent: "center" }}>
      <div style={{ display: "flex" }}>
        {chatList.map((v) => {
          return (
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
          );
          // : (
          //   <div>Unfinished Chat!</div>
          // );
        })}
      </div>
      <p />
      <Container>
        {selectedChatList.map((v) => {
          console.log("words");
          console.log(v.ChatMessages);
          return (
            <div>
            <Row style={{ marginTop: "20px" }}>
              {v.ChatMessages &&
                v.ChatMessages.map((oneSentence) => {
                  return oneSentence.words.map((m) => {
                    // return <div>{uno.oneWord[0]}</div>
                    return (
                      <div
                        class="col-lg-2 col-md-4 col-sm-4 col-6"
                        style={{ color: "red" }}
                      >
                        <ReactCardFlip
                          isFlipped={m.isFlipped}
                          flipDirection="vertical"
                          // sx={{m:200}}
                        >
                          <Card
                            style={{
                              maxWidth: "250px",
                              maxHeight: "200px",
                              margin: "10px",
                              // alignItems: "flex-start"
                            }}
                          >
                            <CardContent>
                              <Typography>
                                {/* <div style={{ display: "flex", flexDirection: "column"}}> */}
                                {m.oneWord[0]}

                                {/* </div> */}
                              </Typography>

                              <Typography>
                                {/* <div style={{ display: "flex", flexDirection: "column"}}> */}
                                {m.oneWord[2]}

                                {/* </div> */}
                              </Typography>
                              <TextToSpeech text={m.oneWord[0]} />
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
                                        shareSentence(v, oneSentence, m);
                                      }}
                                      class="shareCard"
                                    >
                                      Share
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        shareSentence(v, oneSentence, m);
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
                                    handleClick(v, oneSentence, m);
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
                              maxHeight: "200px",
                              margin: "10px",
                              // alignItems: "flex-start"
                            }}
                          >
                            <CardContent>
                              <Typography>
                                {/* <div style={{ display: "flex", flexDirection: "column"}}> */}
                                {m.oneWord[1]}

                                {/* </div> */}
                              </Typography>
                              <p />
                              <div style={{ display: "flex" }}>
                                {!m.isShared ? (
                                  <button
                                    onClick={() => {
                                      shareSentence(v, oneSentence, m);
                                    }}
                                    class="shareCard"
                                  >
                                    Share
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      shareSentence(v, oneSentence, m);
                                    }}
                                    class="shareCard"
                                    style={{ background: "grey" }}
                                  >
                                    Shared!
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    handleClick(v, oneSentence, m);
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
                  });
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
          );
        })}
      </Container>
    </div>
    // </div>
  );
}

export default Words;
