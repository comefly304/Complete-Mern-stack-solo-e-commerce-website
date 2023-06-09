import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = ({path}) => {
  const [timer, settimer] = useState(3);
  const navigate = useNavigate();
  const localtion=useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      settimer((prevdata) => --prevdata);
    }, 1000);
    if (timer === 0) navigate(`${path}`,{
        state:localtion.pathname
    });
    return () => clearInterval(interval);
  }, [timer, navigate,localtion,path]);

  return (
    <>
      <div
        className=" spinner text-center flex-column"
        style={{ height: "80vh" }}
      >
        <div>
            <h1>Redirecting in {timer}seconds</h1>
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
