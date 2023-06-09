import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import './Authstyle.css'
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const navigate = useNavigate();

  //handle submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="form-container m-3 ">
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="Number"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="form-control"
              placeholder="phone"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              className="form-control"
              placeholder="address"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Whats ur favourite food?"
              value={answer}
              onChange={(e) => setanswer(e.target.value)}
            />
          </div>
          <div>
            <NavLink to="/login">
              <h4>Login</h4>
            </NavLink>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
