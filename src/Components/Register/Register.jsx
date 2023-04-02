import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState('');

  async function handelregister(values) {
    setisLoading(true);
    // let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((err)=>{
    //   setisLoading(false);
    //   setmessageError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`);
    // });
    // if (data.message === "success") {
    //   setisLoading(false);
    //   navigate("/login");
    // }
    try{
      let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values)
      if (data.message === "success") {
        setisLoading(false);
        navigate("/login");
      }
    }catch(err){
      setisLoading(false);
      setmessageError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`);
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase and length 5 to 8 letter or number"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and repassword doesnt match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyption number"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelregister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Register Now : </h3>
        {messageError?<div className="alert alert-danger">{messageError}</div>:null}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="rePassword">Repassword</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}

          <label htmlFor="phone">Phone</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}
          {!isLoading ?<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white">Register</button> : <button className="btn bg-main text-white"><i className="fas fa-spinner fa-spin"></i> </button>}
        </form>
      </div>
    </>
  );
}
