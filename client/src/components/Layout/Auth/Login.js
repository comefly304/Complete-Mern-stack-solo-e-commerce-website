import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import './Authstyle.css'
import { useAuth } from "../context/authcontex";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const localtion = useLocation();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        navigate(localtion.state || "/");
        localStorage.setItem("auth", JSON.stringify(res.data));
      }
    } catch (err) {
      toast.error("something went wrong while login");
    }
  };

  return (
    <Layout>
      <div className="registerform m-3 ">
        <h1>Login</h1>
      <h7 className="card bg-light text-dark">Admin email : admin@gmail.com</h7>
      <h7 className="card bg-light text-dark">Password: 1234</h7>
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
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div>
          <NavLink to="/forgot-password">
            <button className="btn btn-primary ">Fporgot password</button>
          </NavLink>
          </div>
          <button type="submit" className="loginbtn btn btn-primary">
            Login
          </button>
          <div>
          <NavLink to="/register">
          <h4>create a free account now</h4> 
          </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
