import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = useCategory();
  return (
    <Layout>
      <h1 className="text-center">All categories</h1>
      <div className="categoriesdiv container-fluid">
        {categories.map((c) => (
          <div className="categoriesbtn " key={c._id}>
            <Link to={`/category/${c.slug}`}>
              <button className="catbtn btn btn-secondary-outline">
                {c.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Category;
