import sleep from "../../ultis/sleep";
import { Product, ProductFormValue } from "../../types/Product";
import axiosInstance from "../../config/axiosInstance";

const getProducts = async (): Promise<Product[]> => {
  await sleep();
  const response = await axiosInstance.get("/products");
  return response.data;
};

const getProduct = async (id: string): Promise<Product> => {
  await sleep();
  const response = await axiosInstance.get("/products/" + id);
  return response.data;
};

const updateProduct = async (
  id: string,
  newValue: ProductFormValue
): Promise<Product> => {
  await sleep();
  const response = await axiosInstance.put(`/products/${id}`, newValue);
  return response.data;
};

const createProduct = async (formValue: ProductFormValue): Promise<Product> => {
  await sleep();
  const response = await axiosInstance.post("/products", formValue);
  return response.data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await sleep();
  await axiosInstance.delete(`/products/${id}`);
};

export { getProducts, getProduct, updateProduct, createProduct, deleteProduct };
