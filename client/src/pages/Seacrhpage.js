import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../components/Layout/context/Seacrh";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Layout/context/cart";
import toast from 'react-hot-toast'

const Seacrhpage = () => {
  const [values, setvalues] = useSearch();
  const [cart,setcart]=useCart()
  const navigate=useNavigate()
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h4>Seacrh Results</h4>
          <h6>
            {values.length < 1
              ? "No products found"
              : `Found matching products${values?.results.length}`}
          </h6>
          <div className="productshomeimg">
              {values?.results.map((p) => (
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
                    <p className="tex-dark">Rs {p.price}/-</p>
                    <button className="productbtn btn btn-primary ms-2"
                     onClick={() => navigate(`/productdetails/${p.slug}`)}
                    >
                      More info
                    </button>
                    <button className="productbtn btn btn-success ms-2"  onClick={() => {
                        const updatedCart = [...cart, p];
                        setcart(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                        toast.success("item added to cart");
                      }}>
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Seacrhpage;
