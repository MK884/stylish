import { endPoints } from "@/constants";
import axios, { AxiosError } from "axios";

export class Products {
  async getAllProducts() {
    try {
      const response = await axios.get(endPoints.getAllProducts);
      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        const serverError = error.response?.data;
        console.log("Server error in getAllProducts: ", serverError);
        throw new Error(serverError?.message);
      }
      console.log("Unexpected error in getAllProducts: ", error);
    }
  }
  async getProductsById(id: number) {
    if (!id) return null;
    try {
      const response = await axios.get(`${endPoints.getProductById}/${id}`);
      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        const serverError = error.response?.data;
        console.log("Server error in getProductsById: ", serverError);
        throw new Error(serverError?.message);
      }
      console.log("Unexpected error in getProductsById: ", error);
    }
  }
  async getProductsByCategory(category: Categories) {
    try {
      const response = await axios.get(
        `${endPoints.getProductsByCategory}/${category}`
      );
      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        const serverError = error.response?.data;
        console.log("Server error in getProductsByCategory: ", serverError);
        throw new Error(serverError?.message);
      }
      console.log("Unexpected error in getProductsByCategory: ", error);
    }
  }
}


export const ProductsService = new Products();