import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewcomment] = useState("");
  const { authState } = useContext(AuthContext);
  let navi = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        { commentBody: newComment, PostId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.error) {
          return alert(res.data.error);
        }
        const commentToAdd = {
          commentBody: newComment,
          userName: res.data.userName,
          id: res.data.id,
        };
        setComments([...comments, commentToAdd]);
        setNewcomment("");
      });
  };

  const deleteComment = (cId) => {
    axios
      .delete(`http://localhost:3001/comments/${cId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (res.data.error) {
          return alert(res.data.error);
        }
        setComments(
          comments.filter((val) => {
            return val.id != cId;
          })
        );
      });
  };

  const deletePost = (pId) => {
    axios
      .delete(`http://localhost:3001/posts/${pId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((r) => {
        navi("/");
        alert("deleted");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Type new title");
      axios
        .put(
          "http://localhost:3001/posts/title",
          { newTitle: newTitle, id: id },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((r) => {
          console.log(r.data);
          setPostObject({...postObject, title: newTitle})
        });
    } else {
      let newText = prompt("Type new postText");
      axios
        .put(
          "http://localhost:3001/posts/postText",
          { newText: newText, id: id },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((r) => {
          console.log(r.data);
          setPostObject({...postObject, postText: newText})
        });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.userName === postObject.userName) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.userName === postObject.userName) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {postObject.userName}
            {authState.userName === postObject.userName && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            value={newComment}
            type="text"
            placeholder="Comments..."
            autoComplete="off"
            onChange={(event) => {
              setNewcomment(event.target.value);
            }}
          ></input>
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.userName}</label>
                {authState.userName === comment.userName && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
