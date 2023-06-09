import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontex";

const Forgotpassword = () => {
  const [email, setemail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error("something went wrong while changing password");
    }
  };

  return (
    <Layout>
      <div className="registerform m-3 ">
        <h1>Forgot password</h1>
        <form onSubmit={handlesubmit}>
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
              type="text"
              value={answer}
              onChange={(e) => setanswer(e.target.value)}
              className="form-control"
              placeholder="Whats ur favourite food?"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="form-control"
              placeholder="New password"
            />
          </div>
          <div className="backbtn">
            <NavLink to="/login">
              <button className="btn btn-primary ">Back</button>
            </NavLink>
          </div>
          <button type="submit" className="loginbtn btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgotpassword;
