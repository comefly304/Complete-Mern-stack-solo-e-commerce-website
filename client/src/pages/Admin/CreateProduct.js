import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState("");
  const [photo, setphoto] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [shipping, setshipping] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const navigate = useNavigate();

  const getcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data.success) {
        setcategories(data.category);
      }
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    getcategories();
  }, []);

  //onsubmit
  const handlecreate = async (e) => {
    e.preventDefault();
    try {
      const productsdata = new FormData();
      productsdata.append("name", name);
      productsdata.append("description", description);
      productsdata.append("photo", photo);
      productsdata.append("quantity", quantity);
      productsdata.append("shipping", shipping);
      productsdata.append("price", price);
      productsdata.append("category", category);

      const { data } = await axios.post(
        "http://localhost:8080/api/product/create-product",
        productsdata
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      toast.error("something went wrong while creating product");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75">
            <h1>Create Products</h1>
            <Select
              bordered={false}
              size="medium"
              showSearch
              placeholder="select a category from the existing category"
              onChange={(value) => setcategory(value)}
              className="form-select mb-3"
            >
              {categories?.map((p) => (
                <Option key={p._id} value={p._id}>
                  {p.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-secondary">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setphoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              <div className="text-center">
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    accept="image/*"
                    alt={photo.name}
                    height={"200px"}
                    className="img img-responsive"
                  />
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name of the product"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="Number"
                  placeholder="price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="Number"
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  showSearch
                  size="medium"
                  className="form-select mb-3"
                  placeholder="Shipping available?"
                  onChange={(value) => setshipping(value)}
                >
                  <Option value="1">YES</Option>
                  <Option value="0">NO</Option>
               
                </Select>
              </div>
              <div>
                <button
                  onClick={handlecreate}
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
