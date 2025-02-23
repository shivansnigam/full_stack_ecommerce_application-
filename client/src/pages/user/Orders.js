import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://full-stack-ecommerce-application-eight.vercel.app/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard orders-page">
        <style>
          {`
            .orders-page {
              margin-top: 64px;
            }

            .orders-page h1 {
              padding: 15px !important;
              font-family: "Roboto", sans-serif;
              font-weight: normal;
              background-color: rgba(0, 0, 255, 0.072) !important;
              text-align: center;
              margin-bottom: 20px;
            }

            .orders-page .table {
              width: 100%;
              margin-bottom: 1rem;
              color: #212529;
              background-color: #f9f9f9;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .orders-page .table thead th {
              background-color: #4a90e2;
              color: white;
              padding: 10px;
            }

            .orders-page .table tbody tr {
              transition: background-color 0.3s;
            }

            .orders-page .table tbody tr:hover {
              background-color: #f1f1f1;
            }

            .orders-page .card {
              padding: 10px;
              margin-bottom: 20px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s, box-shadow 0.3s;
            }

            .orders-page .card:hover {
              transform: translateY(-10px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .orders-page .card img {
              width: 100%;
              height: 200px;
              border-radius: 8px;
              margin-bottom: 10px;
              object-fit: cover;
              transition: transform 0.3s;
            }

            .orders-page .card img:hover {
              transform: scale(1.05);
            }

            @media (max-width: 767px) {
              .row {
                flex-direction: column;
              }

              .col-md-3,
              .col-md-9 {
                width: 100%;
                padding: 0;
              }

              .orders-page .table thead {
                display: none;
              }

              .orders-page .table tbody tr {
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #dee2e6;
                margin-bottom: 1rem;
                padding: 1rem;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }

              .orders-page .table tbody td {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border: none;
              }

              .orders-page .card {
                flex-direction: column;
              }

              .orders-page .card img {
                width: 100%;
                height: 200px;
                margin-bottom: 10px;
              }

              .orders-page .table tbody td::before {
                content: attr(data-label);
                font-weight: bold;
                width: 50%;
                padding-right: 10px;
              }
            }
          `}
        </style>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="#"> {i + 1} </td>
                        <td data-label="Status"> {o?.status} </td>
                        <td data-label="Buyer"> {o?.buyer?.name} </td>
                        <td data-label="Date"> {moment(o?.createdAt).fromNow()} </td>
                        <td data-label="Payment"> {o?.payment?.success ? "Success" : "Failed"} </td>
                        <td data-label="Quantity"> {o?.products?.length} </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`https://full-stack-ecommerce-application-eight.vercel.app/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"200px"} // Adjusted height here
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
