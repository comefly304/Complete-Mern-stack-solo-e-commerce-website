import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../components/Layout/context/cart";
import { useAuth } from "../components/Layout/context/authcontex";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setcart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total
  const totalprice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-Us", {
        style: "currency",
        currency: "INR",
      });
    } catch (err) {
      console.log(err);
    }
  };

  //remove item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setcart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  // get payment gateway token braintree
  const getbraintreetoken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getbraintreetoken();
  }, [auth?.token]);

  //payment handle
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setcart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-center p-1">{` ${
              auth?.token ? `Welcome ${auth?.user?.name}` : `Your not logged in`
            }`}</h5>
            <h4 className="text-center p-1">
              {cart?.length
                ? `you have ${cart.length} items in your cart ${
                    !auth?.token ? `Please login to checkout your cart` : ``
                  }`
                : `you have 0 items in your cart ${
                    auth?.token ? `` : `login to checkout`
                  }`}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 ">
            <h5 className="text-center card text-dark">cart produtcs</h5>
            {cart?.map((c) => (
              <div className="row">
                <div className="col-md-4 card  gx-1 gy-1">
                  <img
                    src={`http://localhost:8080/api/product/product-photo/${c._id}`}
                    className="card-img-top homeimg"
                    alt={c.name}
                    height={"200px"}
                  />
                </div>
                <div className="col-md-8 card bg-light gx-1 gy-1">
                  <div className="pdetails mt-3 ">
                    <h5>
                      <span className="name">Name :</span> {c.name}
                    </h5>
                    <h5>
                      <span className="shipping">Shipping available :</span>
                      {c.shipping ? "YES" : "NO"}
                    </h5>
                    <h5>
                      <span className="price"> Price :</span>
                      {c.price.toLocaleString("en-Us", {
                        style: "currency",
                        currency: "INR",
                      })}{" "}
                      /- only
                    </h5>
                    <h5>
                      <span className="details">Product Details :</span>{" "}
                      {c.description.substring(0, 30)}
                    </h5>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(c._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="productbtn btn btn-primary ms-2"
                      onClick={() => navigate(`/productdetails/${c.slug}`)}
                    >
                      More info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="payment col-md-4 text-center">
            <div className="text-center col-md-12 card">
              <h3>Payment</h3>
              <hr></hr>
              <h6>Total|Checkout|Payment</h6>
              <h3>Total : {totalprice()} </h3>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h5 className="currentaddress bg-light">
                      Current address :{" "}
                    </h5>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-primary ms-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <>
                        <button className="btn btn-outline-primary">
                          Update Address
                        </button>
                      </>
                    ) : (
                      <>
                        <h5>Please login to checkout</h5>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Login
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  "Please add some items to make payment"
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                          card: true,
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary mb-3"
                      onClick={handlePayment}
                      disabled={
                        loading ||
                        !instance ||
                        !auth?.user?.address ||
                        !clientToken ||
                        !auth?.token
                      }
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
//Dropin should be used in condition
