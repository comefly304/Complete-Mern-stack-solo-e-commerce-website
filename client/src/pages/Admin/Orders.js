import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

const Orders = () => {
  return (
    <Layout>
     <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
         <h1>All Orders</h1>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
