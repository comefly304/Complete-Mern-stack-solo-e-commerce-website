import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Layout/context/cart";

const Homepage = () => {
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [cart, setcart] = useCart();
  const naviagte = useNavigate();
  //getTotal
  const gettoal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/product-count"
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };
  //useEffect loadmore
  useEffect(() => {
    if (page === 1) return; //if page===1 then terminate the function  by return
    loadMore();
  }, [page]);

  //loadmore
  const loadMore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/product/product-list/${page}`
      );
      setloading(false);
      setproducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  //get all products
  const getallproducts = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/product/product-list/${page}`
      );
      setloading(false);
      setproducts(data.products);
    } catch (err) {
      setloading(false);
      console.log(err);
      toast.error("somethong went wrong while getting the proucts");
    }
  };

  //get all categories
  const getcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data.success) {
        setcategories(data?.category);
      }
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    getcategories();
    gettoal();
  }, []);

  //handleFilter
  const handleFilter = async (catvalue, id) => {
    let all = [...checked];
    if (catvalue) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getallproducts();
  }, [checked.length, radio.length]);

  //get filtered products
  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [checked, radio]);

  //get filters products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/product/product-filters`,
        { checked, radio }
      );
      setproducts(data?.products);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  //handle reset
  const handlereset = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <img
        src="/images/unisersal.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        height={"200px"}
      />

      <div className="container-fluid m-3 p-3">
        <div className="row ">
          <div className="col-md-3 ">
            <h4>Filter by category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  value={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4>Filter by price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setradio(e.target.value)}>
                {Prices?.map((p) => (
                  <div>
                    <Radio key={p._id} value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={handlereset}>
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Best Products</h1>
            <div className="productshomeimg">
              {products?.map((p) => (
                <div
                  className="cardetails text-center card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                    className="homeimgtag card-img-top homeimg"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <p className="card-title">{p.name}</p>
                    <p className="card-text">
                      {p.description.substring(0, 40)}...
                    </p>
                    <p className="tex-dark">
                      {p.price.toLocaleString("en-In", {
                        style: "currency",
                        currency: "INR",
                      })}
                      /- only
                    </p>
                    <button
                      className="productbtn btn btn-primary ms-2"
                      onClick={() => naviagte(`/productdetails/${p.slug}`)}
                    >
                      More info
                    </button>
                    <button
                      className="productbtn btn btn-success ms-2"
                      onClick={() => {
                        const updatedCart = [...cart, p];
                        setcart(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                        toast.success("item added to cart");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-3 p-3">
              <div className="text-center">
                {products && products.length < total && (
                  <button
                    className="btn btn-success"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading..." : "Load more..."}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
