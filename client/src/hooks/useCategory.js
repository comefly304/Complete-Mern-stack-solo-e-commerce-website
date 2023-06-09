import { useState, useEffect } from "react";
import axios from "axios";

//custom categories hook

export default function useCategory() {
  const [categories, setcategories] = useState([]);

  const getcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      setcategories(data?.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getcategories();
  }, []);
  return categories;
}
