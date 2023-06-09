import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import { Select } from "antd";

const CreateCategory = () => {
  const [name, setname] = useState("");
  const [categories, setcategories] = useState([]);
  const [visible, setvisible] = useState(false);
  const [selected, setselcted] = useState(null);
  const [updatedname, setupdatedname] = useState("");
 
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/category/create-category",
        {
          name,
        }
      );
      if (data.success) {
        toast.success(`${name} is created`);
        getcategories();
        setname("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //update
  const submithandleupdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/category/update-category/${selected._id}`,
        { name: updatedname }
      );
      if (data.success) {
        toast.success(`${updatedname} is updated`);
        getcategories();
        setupdatedname("");
        setvisible(false)
      }
    } catch (err) {
      toast.error("something went wrong while updating");
      console.log(err);
    }
  };

  //delete
  const handledelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`category delelted`);
        getcategories()
      }
    } catch (err) {
      toast.error("something went wrong while deleting");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage categories</h1>
            <CategoryForm
              handlesubmit={handlesubmit}
              value={name}
              setvalue={setname}
            />
            <div className="w-70">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setvisible(true);
                              setupdatedname(c.name);
                              setselcted(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handledelete(c._id);
                            }}
                            className="btn btn-secondary m-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setvisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedname}
                setvalue={setupdatedname}
                handlesubmit={submithandleupdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
