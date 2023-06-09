import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import toast from "react-hot-toast";
import { useAuth } from "../../components/Layout/context/authcontex";
import axios from "axios";

const Profile = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [auth, setAuth] = useAuth();

  //get user details
  //desctructure properties of user in auth
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setname(name);
    setemail(email);
    setphone(phone);
    setaddress(address);
  }, [auth?.user]);

  //handle submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        console.log(data.error);
        toast.error("somthing went wrong");
      }
      setAuth({ ...auth, user: data?.updatedUser });
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("profile updated successfully");
    } catch (err) {
      toast.error("password should be 6 length long or u cant update your ");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container m-3 card bg-light ">
              <h1>Update Profile</h1>
              <h7 className="card text-center bg-light mb-3">
                Please make password input empty or it should be greater than 6
                characters long while updating{" "}
              </h7>
              <form onSubmit={handlesubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="Number"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    className="form-control"
                    placeholder="phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    className="form-control"
                    placeholder="address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
// const Profile = () => {
//     //context
//     const [auth, setAuth] = useAuth();
//     //state
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");

//     //get user data
//     useEffect(() => {
//       const { email, name, phone, address } = auth?.user;
//       setName(name);
//       setPhone(phone);
//       setEmail(email);
//       setAddress(address);
//     }, [auth?.user]);

//     // form function
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const { data } = await axios.put("http://localhost:8080/api/auth/profile", {
//           name,
//           email,
//           password,
//           phone,
//           address,
//         });
//         if (data?.errro) {
//           toast.error(data?.error);
//         } else {
//           setAuth({ ...auth, user: data?.updatedUser });
//           let ls = localStorage.getItem("auth");
//           ls = JSON.parse(ls);
//           ls.user = data.updatedUser;
//           localStorage.setItem("auth", JSON.stringify(ls));
//           toast.success("Profile Updated Successfully");
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Something went wrong");
//       }
//     };
//     return (
//       <Layout title={"Your Profile"}>
//         <div className="container-fluid m-3 p-3 dashboard">
//           <div className="row">
//             <div className="col-md-3">
//               <UserMenu />
//             </div>
//             <div className="col-md-8">
//               <div className="form-container" style={{ marginTop: "-40px" }}>
//                 <form onSubmit={handleSubmit}>
//                   <h4 className="title">USER PROFILE</h4>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       placeholder="Enter Your Name"
//                       autoFocus
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       placeholder="Enter Your Email "
//                       disabled
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       placeholder="Enter Your Password"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       placeholder="Enter Your Phone"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       placeholder="Enter Your Address"
//                     />
//                   </div>

//                   <button type="submit" className="btn btn-primary">
//                     UPDATE
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   };

//   export default Profile;
