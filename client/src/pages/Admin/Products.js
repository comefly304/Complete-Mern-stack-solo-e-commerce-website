import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  //get products
  const getproducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/get-product"
      );
      if (data.success) {
        setproducts(data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center">
              <h1>All Products</h1>
              <div className="productsimg">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="navlink-product"
                  >
                    <div className="cardetails card" style={{ width: "18rem" }}>
                      <img
                        src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}...</h5>
                        <p className="card-text">
                          {p.description.substring(0, 20)}...
                        </p>
                        <p className="tex-dark">
                          Rs{" "}
                          {p.price.toLocaleString("en-In", {
                            style: "currency",
                            currency: "INR",
                          })}
                          /-
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
