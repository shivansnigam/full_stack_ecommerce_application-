import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <style>
          {`
            .dashboard {
              margin-top: 64px;
            }

            .dashboard .card {
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
              transition: box-shadow 0.3s;
            }

            .dashboard .card:hover {
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            }

            .dashboard h3 {
              font-family: "Roboto", sans-serif;
              font-weight: 500;
              color: #333;
              margin-bottom: 15px;
            }

            .dashboard .user-info {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .dashboard .user-info h3 {
              font-size: 18px;
            }

            @media (max-width: 767px) {
              .dashboard .row {
                flex-direction: column;
              }

              .dashboard .col-md-3,
              .dashboard .col-md-9 {
                width: 100%;
                padding: 0;
              }

              .dashboard .card {
                width: 100%;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <div className="user-info">
                <h3>Name: {auth?.user?.name}</h3>
                <h3>Email: {auth?.user?.email}</h3>
                <h3>Address: {auth?.user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
