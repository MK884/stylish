import { AxiosError, AxiosInstance } from 'axios';

// const { page, limit, search, color, size, category } = req?.query;

const getAllProducts = async ({
  page = 0,
  search,
  limit = 15,
  color,
  size,
  category,
  axios,
}: {
  page?: number;
  limit?: number;
  search?: string;
  color?: string;
  size?: string;
  category?: string;
  axios: AxiosInstance;
}) => {
  if (!axios) return;

  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search && { search }),
      ...(color && { color }),
      ...(size && { size }),
      ...(category && { category }),
    });
    const response = await axios.get(`/product?${queryParams}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getAllProducts: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getAllProducts');
    }
    console.error('getAllProducts error', error);
    throw new Error('getAllProducts error due to some reasone');
  }
};

const getProductById = async ({
  id,
  axios,
}: {
  id: string;
  axios: AxiosInstance;
}) => {
  if (!axios && !id) return;

  try {
    const response = await axios.get(`/product/${id}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getProductById: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getProductById');
    }
    console.error('getProductById error', error);
    throw new Error('getProductById error due to some reasone');
  }
};

const getProductsByStoreId = async ({
  storeId,
  axios,
}: {
  storeId: string;
  axios: AxiosInstance;
}) => {
  if (!axios || !storeId) return;

  try {
    const response = await axios.get(`/products/store/${storeId}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(
        `server error in getProductsByStoreId: ${serverError?.message}`
      );

      throw new Error(
        serverError?.message || 'server error in getProductsByStoreId'
      );
    }
    console.error('getProductsByStoreId error', error);
    throw new Error('getProductsByStoreId error due to some reasone');
  }
};

export { getAllProducts, getProductById, getProductsByStoreId };
