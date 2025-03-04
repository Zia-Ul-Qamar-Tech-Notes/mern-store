import React from "react";
import { Navbar } from "../features/navigation/components/Navbar";
import { AdminDashBoard } from "../features/admin/components/AdminDashBoard";
import { DashboardCards } from "../features/admin/components/DashboardCards";

export const AdminDashboardPage = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <DashboardCards />
      <AdminDashBoard />
    </>
  );
};
