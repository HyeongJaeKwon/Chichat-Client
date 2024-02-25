import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Registration() {
  let navi = useNavigate();
  const initialValues = {
    password: "",
    userName: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6).max(20).required(),
    userName: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((res) => {
     if (res.data.error){
        alert(res.data.error);
      }else{
        navi("/login");
      }

    });
  };

  return (
    <div className="loginContainer">
      <div
        style={{
          width: "400px",
          // background: "rgb(30, 40, 40)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px",
          padding: "20px 20px",
          height: "500px",
        }}
      >
        {" "}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer" style={{alignItems:"center"}}>
            <h3 style={{ color: "white" }}>ChiChat</h3>
            <h1 style={{ color: "white" }}>Create account</h1>
            <div style={{ display: "flex", color: "white" }}>
              <h7>Already user?</h7>

              <div
                style={{
                  marginLeft: "10px",
                  textDecoration: "underline",
                  marginBottom: "20px",
                }}
              >
                <Link to="/login" style={{ color: "white" }}>
                  Login now
                </Link>
              </div>
            </div>
            <label style={{ color: "white", fontWeight: "bold" }}>Name: </label>
            <ErrorMessage name="userName" component="span" />
            <Field
              autoComplete="off"
              id="imputCreatePost"
              name="userName"
              placeholder="(Ex. Name...)"
            />
            <label style={{ color: "white", fontWeight: "bold" }}>
              Password:{" "}
            </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              id="imputCreatePost"
              name="password"
              placeholder="(Ex. Password...)"
              type="password"
            />
            <button type="submit">Sign up</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
