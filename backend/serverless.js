// // server init
// const server = express();

// // database connection
// connectToDB();

// // middlewares
// server.use(
//   cors({
//     origin: process.env.ORIGIN,
//     credentials: true,
//     exposedHeaders: ["X-Total-Count"],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//   })
// );
// server.use(express.json());
// server.use(cookieParser());
// server.use(morgan("tiny"));

// server.get("/", (req, res) => {
//   res.status(200).json({ message: "running" });
// });

// server.listen(8000, () => {
//   console.log("server [STARTED] ~ http://localhost:8000");
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");
const search = require("./routes/Search");
const { connectToDB } = require("./database/db");

// database connection
connectToDB();

const server = express();

// middlewares
server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// routes
// routeMiddleware
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);
// server.use("/search", search);

server.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

module.exports = server;
