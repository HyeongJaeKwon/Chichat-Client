import React, { useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  let navi = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navi("/login");
    }
  }, []);

  const initialValues = {
    title: "",
    postText: "",

  };

  const onSubmit = (data) => {
    

    const st = localStorage.getItem("accessToken");

    axios.post("https://post-it-practice-b43790932dc1.herokuapp.com/posts", data, {headers:{accessToken:localStorage.getItem('accessToken')}}).then((response) => {
      navi("/");
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title"),
    postText: Yup.string().required(),
  
  });
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="imputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="imputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
    
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
