import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./src/routes/product.js";
import categoryRouter from "./src/routes/category.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());
app.use(productRouter);
app.use(categoryRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Kết nối thành công!");
  })
  .catch(() => {
    console.log("Kết nối thất bại!");
  });

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
