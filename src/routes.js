/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import Products from "views/Products";
import Branch from "./views/Branch";
import Stock from "./views/Stock";
import StockRequest from "./views/StockRequest";
import MakeStockRequest from "./views/MakeStockRequest";
import React from "react";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Stock Request",
    icon: "ui-1_bell-53",
    component: StockRequest,
    layout: "/admin",
  },
  {
    path: "/stock",
    name: "Current Stock",
    icon: "business_bank",
    component: Stock,
    layout: "/admin",
  },
  {
    path: "/branch",
    name: "Branch List",
    icon: "business_bank",
    component: Branch,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products List",
    icon: "shopping_box",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin",
  },

];

const internalRoutes = [
  {
    path: "/make-stock-request",
    component: MakeStockRequest,
    layout: "/admin",
  },
];

export {dashRoutes, internalRoutes};
