import { AxiosError, AxiosInstance } from 'axios';

const getAllStore = async (axios: AxiosInstance) => {
  if (!axios) return;

  try {
    const response = await axios.get('/store');
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getAllStore: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getAllStore');
    }
    console.error('getAllStore error', error);
    throw new Error('getAllStore error due to some reasone');
  }
};

const getStoreById = async ({
  id,
  axios,
}: {
  id: string;
  axios: AxiosInstance;
}) => {
  if (!id || !axios) return;

  try {
    const response = await axios.get(`/store/${id}`);
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getStoreById: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getStoreById');
    }
    console.error('getStoreById error', error);
    throw new Error('getStoreById error due to some reasone');
  }
};

export { getAllStore, getStoreById };
