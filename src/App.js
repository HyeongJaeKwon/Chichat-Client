import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import GPT from "./pages/GPT";

import ChangePassword from "./pages/ChangePassword";
import SeeCards from "./pages/MyCards";
import TextToSpeech from "./components/TextToSpeech";
// import { useNavigate } from "react-router-dom";

function App() {
  const [authState, setAuthState] = useState({
    userName: "",
    id: 0,
    status: false,
  });
  let navi = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          console.log("here>?");
          setAuthState({
            userName: res.data.userName,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      userName: "",
      id: 0,
      status: false,
    });
    navi("/");
    window.location.reload(false);

  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
  
          <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            {!authState.status ? (
              <div>
                <Link to="/"><i style={{fontWeight:"bold"}}>ChiChat</i></Link>
                <Link to="/login">Login</Link>
                <Link to="/registration">Sign up</Link>
              </div>
            ) : (
              <div>
                <Link to="/"><i style={{fontWeight:"bold"}}>ChiChat</i></Link>
                {/* <Link to="/createpost">Create a Post</Link> */}
                <Link to="/gpt">GPT</Link>
                <Link to="/mycards">My Cards</Link>
              </div>
            )}

            {authState.status && (
              <div className="loggedInContainer">
                <h4>{authState.userName}</h4>
                <button
                  onClick={logout}
                  style={{
                    background: "white",
                    padding: "0px",
                    width: "60px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile/:uId" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/gpt" element={<GPT />} />
            <Route path="/mycards" element={<SeeCards />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      
      </AuthContext.Provider>
    </div>
  );
}

export default App;
