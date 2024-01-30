import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
    const initialValues = {
       
        password: "",
        userName: "",
      };

      
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6).max(20).required(),
   
    userName: Yup.string().min(3).max(15).required(),
  });

  const onSubmit =(data)=>{
    axios.post("https://ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com/auth", data).then(()=>{
        console.log(data);
    })
  }

  return (
    <div>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Name: </label>
          <ErrorMessage name="userName" component="span"/>
          <Field
            autoComplete="off"
            id="imputCreatePost"
            name="userName"
            placeholder="(Ex. Name...)"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span"/>
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
  )
}

export default Registration