import { endPoints } from "@/constants";
import axios, { AxiosError } from "axios";

export class Categories {
  async getAllCategories() {
    try {
      const response = await axios.get(`${endPoints.getAllCategories}`);
      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        const serverError = error.response?.data;
        console.log("Server error in getAllCategories: ", serverError);
        throw new Error(serverError?.message);
      }
      console.log("Unexpected error in getAllCategories: ", error);
    }
  }
}


export const CategoriesService = new Categories();
