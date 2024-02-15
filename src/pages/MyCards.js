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
import Sentences from "../components/Sentences";
import Added from "../components/Added";

import Words from "../components/Words";

function MyCards() {
  const [cate, setCate] = useState("sentences");

  return (
    <div>
      {/* <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          Company name
        </a>
        <input
          class="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </nav> */}

      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <p />

                <div
                  style={{
                    padding: "10px 20px",
                    fontWeight: "bold",
                  }}
                >
                  My Collections
                </div>
                <div
                  class="nav-link"
                  onClick={() => {
                    setCate("sentences");
                  }}
                 
                >
                  Sentences
                </div>
                <div
                   class="nav-link"
                    onClick={() => {
                      setCate("words");
                    }}
                  >
                    Words
                </div>
                <div
                   class="nav-link"
                    onClick={() => {
                      setCate("adds");
                    }}
                  >
                    Added
                </div>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            {cate == "sentences" ? <Sentences /> : cate == "words" ? <Words /> : <Added/>}
          </main>
        </div>
      </div>
    </div>
  );
}


export default MyCards;
