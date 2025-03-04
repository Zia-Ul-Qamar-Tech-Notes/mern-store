import React from "react";
import "./DashboardCards.css";
import { Link } from "react-router-dom";

const totalUsers = await fetch(`${process.env.REACT_APP_BASE_URL}/users`);
let users = await totalUsers.json();
const mostReviewed = await fetch(
  `${process.env.REACT_APP_BASE_URL}/reviews/most-reviewed`
);
let reviewed = await mostReviewed.json();
let products = await fetch(`${process.env.REACT_APP_BASE_URL}/products`);
products = await products.json();
let totalProducts = products.length;

let totalIncome = await fetch(
  `${process.env.REACT_APP_BASE_URL}/orders/orders`
);
totalIncome = await totalIncome.json();

export const DashboardCards = () => {
  return (
    <>
      <div className="dashboard-container">
        {/* Total Users */}
        <Link
          to={`${process.env.REACT_APP_BASE_URL}/users`}
          target="_blank"
          className="card earning-card"
        >
          <p className="earning-amount">{users.length}</p>
          <span className="earning-label">Total Users</span>
        </Link>

        {/* Total Products */}
        <Link
          to={`${process.env.REACT_APP_BASE_URL}/products`}
          target="_blank"
          className="card earning-card"
        >
          <p className="earning-amount">{totalProducts}</p>
          <span className="earning-label">Total Products</span>
        </Link>

        {/* Most Reviewed */}

        <Link
          to={`/product-details/${reviewed.product._id}`}
          className="card earning-card"
        >
          <p className="earning-amount">{reviewed.product.title}</p>
          <span className="earning-label">Most Reviewed</span>
          <h6>No. of Reviews: {reviewed.totalReviews}</h6>
        </Link>

        {/* Small Cards */}
        <div className="small-cards">
          <div className="card small-card">
            <p className="small-card-value">$ {totalIncome.totalPrice}</p>
            <span className="small-card-label">Total Income Generated</span>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        {/* Total Orders */}
        <Link to={"/admin/orders"} className="card earning-card">
          <p className="earning-amount">{totalIncome.totalOrders}</p>
          <span className="earning-label">Total Orders</span>
        </Link>

        {/* Total Income */}
        <div className="card earning-card">
          <p className="earning-amount">{totalIncome.totalPrice}</p>
          <span className="earning-label">Total Income</span>
        </div>
      </div>
    </>
  );
};
