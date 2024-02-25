import React from "react";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TextToSpeech from "../components/TextToSpeech";
// import { options } from "../../../server/routes/GPT";
function GPT() {
  const myDivRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  //   const [replyList, setReplyList] = useState([]);
  //   const [promptList, setPromptList] = useState([]);

  // const [currentChatList, setCurrentChatList] = useState([]);

  const [chatList, setChatList] = useState([]);
  const [index, setIndex] = useState(-1);
  let navi = useNavigate();

  const scrollToTop = () => {
    // Access the current property of the ref to get the DOM element
    const myDiv = myDivRef.current;

    // Use scrollTop to set the scroll position to the top
    if (myDiv) {
      myDiv.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const submitPrompt = () => {
    if (prompt == "") {
      return;
    }
    var add = false;

    if (chatList[index].ChatMessages.length == 0) {
      add = true;
    }

    const data = {
      userPrompt: prompt,
      ChatId: chatList.length == 0 ? 0 : chatList[index].id,
      add: add,
    };

    setChatList(
      chatList.filter((each, idx) => {
        if (index == idx) {
          each.ChatMessages.push({ message: prompt });
          return each;
        }
        return each;
      })
    );

    axios
      .post("http://localhost:3001/gpt/chat", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (res.data.error) {
          console.log("error prompt jgt.js");
          alert(res.data.error);
          setChatList(chatList.slice(0, -1));
        } else {
          console.log("submitPrompt gpt.js");
          console.log(res.data);
          setChatList(
            chatList.filter((each, idx) => {
              if (index == idx) {
                each.ChatMessages.push({ message: res.data });
                return each;
              }
              return each;
            })
          );
        }
      });
    setPrompt("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/gpt", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setChatList(response.data.res);

        if (response.data.res.length == 0) {
          console.log("-1 trig");
          openNewChat();
        } else {
          setIndex(response.data.res.length - 1);
        }

        console.log("useEffect gpt.js");
        console.log(response.data);
        console.log(response.data.res[response.data.res.length - 1]);
      });
  }, []);

  const openNewChat = () => {
    setChatList([...chatList, { id: index + 1, ChatMessages: [] }]);
    setIndex(index + 1);
  };

  const switchChat = (idx) => {
    setIndex(idx);
  };

  const renderElementsFromLargestIndex = () => {
    const elements = [];
    for (let i = chatList.length - 1; i >= 0; i--) {
      elements.push(
        <div
          style={{
            padding: "15px",
            border: "1px solid white",
            borderRadius: "5px",
            // width:"100%",
            background: i == index ? "darkgrey" : "none",
            margin: "10px",
            overflow:"hidden",
            textOverflow:"ellipsis",
            whiteSpace:"nowrap",
          }}
          onClick={() => switchChat(i)}
        >
          {/* Chat History: {chatList[i].id} {i} */}
          {chatList[i].ChatMessages.length === 0 ? "Empty Chat" : `Chat: ${chatList[i].ChatMessages[0].message}`}
          
        </div>
      );
    }
    return elements;
  };

  

  return (
    <div style={{ display: "flex" }}>
      <div id="sidebar">
        {chatList.length != 0 &&
        chatList[chatList.length - 1].ChatMessages &&
        chatList[chatList.length - 1].ChatMessages.length > 8 ? (
          <div
            style={{
              padding: "15px",
              border: "1px solid white",
              borderRadius: "5px",
              //   background: "darkgrey",
              margin: "10px",
            }}
            onClick={openNewChat}
          >
            New Chat +
          </div>
        ) : (
          <div
            style={{
              padding: "15px",
              border: "1px solid white",
              borderRadius: "5px",
              //   background: "darkgrey",
              margin: "10px",
            }}
            onClick={() => {
              switchChat(chatList.length - 1);
            }}
          >
            Unfinished...
          </div>
        )}
        <div>{renderElementsFromLargestIndex()}</div>
      </div>

      <div className="gpt-main" ref={myDivRef}>
        <div
          style={{
            // width: "800px",
            overflow: "hidden",
          }}
        >
          {chatList[index] && chatList[index].ChatMessages.length >= 9 && (
            <div className="loginContainer">
              <button
                onClick={() => {
                  navi("/mycards");
                }}
              >
                {" "}
                See Cards!{" "}
              </button>
            </div>
          )}

          {chatList[index] &&
            chatList[index].ChatMessages &&
            chatList[index].ChatMessages.map((e, key) => {
              return key % 2 === 0 ? (
                <div
                  style={{
                    // width: "800px",
                    background: key % 2 === 0 ? "white" : "rgb(210, 204, 204)",
                    padding: "15px",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                >
                  {e.message}
                </div>
              ) : JSON.parse(e.message).chineseV === undefined ? (
                <div
                  style={{
                    // width: "800px",
                    background: "rgb(210, 204, 204)",
                    padding: "15px",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                >
                  {e.message}
                </div>
              ) : (
                <div
                  style={{
                    // width: "800px",
                    background: "rgb(210, 204, 204)",
                    padding: "15px",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "solid white",
                      borderRadius: "3px",
                      padding: "15px",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      Chinese: {JSON.parse(e.message).chineseV}
                    </div>
                    <TextToSpeech text={JSON.parse(e.message).chineseV} />
                  </div>

                  <div
                    style={{
                      borderBottom: "solid white",
                      borderRadius: "3px",
                      padding: "15px",
                    }}
                  >
                    Pronunciation: {JSON.parse(e.message).pronunciation}
                  </div>
                  <Carousel
                    responsive={{
                      superLargeDesktop: {
                        // the naming can be any, depends on you.
                        breakpoint: { max: 4000, min: 3000 },
                        items: 5.5,
                      },
                      desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 3.5,
                      },
                      tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 2.5,
                      },
                      mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1.5,
                      },
                    }}
                    // ssr={true} // means to render carousel on server-side.
                    // infinite={false}
                    // autoPlaySpeed={1000}
                    // keyBoardControl={true}
                    // customTransition="all .5"
                    // transitionDuration={500}
                    // containerClass="carousel-container"
                    // dotListClass="custom-dot-list-style"
                    // itemClass="carousel-item-padding-40-px"
                    // swipeable={true}
                    // draggable={true}
                    // showDots={false}
                    // arrows={false}
                    // rewind={false}
                    // rewindWithAnimation={false}
                    // // minimumTouchDrag={false}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    // infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    partialVisible
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                  >
                    {JSON.parse(e.message).words.map((each) => {
                      // console.log(each)
                      return (
                        <Box>
                          <Card
                            variant="outlined"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              minWidth: "200px",
                              margin: "10px 10px",
                              position: "relative",
                              overflow: "hidden",
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
                        </Box>
                      );
                    })}
                  </Carousel>
                </div>
              );
            })}
        </div>

        {/**This is the prompter */}
        {chatList[index] && chatList[index].ChatMessages.length < 9 ? (
          <div className="loginContainer">
            <div>
              Complete 5 sentences for studying cards! (
              {chatList[index].ChatMessages.length / 2}/5)
            </div>
            <input
              type="text"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              style={{border:"1px solid black"}}
              value={prompt}
              placeholder={` Enter your sentence`}
            />

            <button onClick={submitPrompt}>Submit the Prompt</button>
          </div>
        ) : (
          <div className="loginContainer">
            <button onClick={scrollToTop}>Top</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GPT;
