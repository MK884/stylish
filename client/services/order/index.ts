import { AxiosError, AxiosInstance } from 'axios';

const getAllOrders = async (axios: AxiosInstance) => {
  if (!axios) return;

  try {
    const response = await axios.get('/order');

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getAllOrder: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getAllOrder');
    }
    console.error('getAllOrder error', error);
    throw new Error('getAllOrder error due to some reasone');
  }
};

const getOrderById = async ({
  orderId,
  axios,
}: {
  orderId: string;
  axios: AxiosInstance;
}) => {
  if (!orderId || !axios) return;

  try {
    const response = await axios.get(`/order/${orderId}`);
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getOrderById: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getOrderById');
    }
    console.error('getOrderById error', error);
    throw new Error('getOrderById error due to some reasone');
  }
};

const placeOrder = async ({
  addressId,
  axios,
  cartId,
}: {
  axios: AxiosInstance;
  addressId: string;
  cartId: string;
}) => {
  if (!cartId || !axios || !addressId) return;

  try {
    const data = {
      addressId,
      cartId,
    };

    const response = await axios.post(`/order`, data);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in placeOrder: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in placeOrder');
    }
    console.error('placeOrder error', error);
    throw new Error('placeOrder error due to some reasone');
  }
};

const cancelOrder = async ({
  axios,
  orderId,
}: {
  axios: AxiosInstance;
  orderId: string;
}) => {
  if (!orderId || !axios) return;

  try {
    const response = await axios.delete(`/order/${orderId}`);
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in cancel order: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in cancel order');
    }
    console.error('cancel order error', error);
    throw new Error('cancel order error due to some reasone');
  }
};

export { getAllOrders, getOrderById, placeOrder, cancelOrder };
