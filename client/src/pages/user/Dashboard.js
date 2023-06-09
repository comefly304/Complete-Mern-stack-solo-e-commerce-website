import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../Admin/AdminMenu";
import { useAuth } from "../../components/Layout/context/authcontex";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import UserMenu from "./UserMenu";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  const [categories, setcategories] = useState([]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="card w-50 col-md-9">
            <h3>User name :{auth?.user?.name}</h3>
            <h3>User email : {auth?.user?.email}</h3>
            <h3>User phone : {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
