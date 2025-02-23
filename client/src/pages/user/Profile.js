import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate("/dashboard/user"); // Redirect to /dashboard/user
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard profile-page">
        <style>
          {`
            .profile-page {
              margin-top: 64px;
            }

            .profile-page .form-container {
              background-color: #fff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .profile-page h4.title {
              font-family: "Roboto", sans-serif;
              font-weight: 500;
              color: #333;
              margin-bottom: 20px;
              text-align: center;
            }

            .profile-page .form-control {
              border-radius: 6px;
              border: 1px solid #ced4da;
              box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
              transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }

            .profile-page .form-control:focus {
              border-color: #80bdff;
              outline: 0;
              box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
            }

            .profile-page .btn-primary {
              background-color: #007bff;
              border-color: #007bff;
              padding: 10px 20px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 500;
              width: 100%;
              transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
            }

            .profile-page .btn-primary:hover {
              background-color: #0056b3;
              border-color: #004085;
            }

            @media (max-width: 767px) {
              .profile-page {
                padding: 15px;
              }

              .profile-page .form-container {
                padding: 20px;
              }

              .profile-page .btn-primary {
                font-size: 14px;
                padding: 10px;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
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
