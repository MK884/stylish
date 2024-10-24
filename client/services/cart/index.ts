import { AxiosError, AxiosInstance } from 'axios';

const getCart = async (axios: AxiosInstance) => {
  if (!axios) return;

  try {
    const response = await axios.get('/cart');
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getCart: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getCart');
    }
    console.error('getCart error', error);
    throw new Error('getCart error due to some reasone');
  }
};

const updateCart = async ({
  axios,
  productId,
  qty = 1,
  color,
  size,
}: {
  axios: AxiosInstance;
  productId: string;
  qty?: number;
  color?: colors;
  size?: size;
}) => {
  if (!axios || !productId) return;

  const data: { [kye: string]: any } = {
    productId,
    qty,
  };

  if (color) data.color = color;
  if (size) data.s = size;

  try {
    const response = await axios.post(`/cart/add`, data);
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in addToCart: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in addToCart');
    }
    console.error('addToCart error', error);
    throw new Error('addToCart error due to some reasone');
  }
};

const removeFromCart = async ({
  axios,
  productId,
}: {
  axios: AxiosInstance;
  productId: string;
}) => {
  if (!axios || !productId) return;

  try {
    const response = await axios.delete(`/cart/remove/${productId}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in removeFromCart: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in removeFromCart');
    }
    console.error('removeFromCart error', error);
    throw new Error('removeFromCart error due to some reasone');
  }
};

const clearCart = async (axios: AxiosInstance) => {
  try {
    const response = await axios.delete('/cart');
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in clearCart: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in clearCart');
    }
    console.error('clearCart error', error);
    throw new Error('clearCart error due to some reasone');
  }
};

const getCartById = async ({
  axios,
  cartId,
}: {
  axios: AxiosInstance;
  cartId: string;
}) => {
  if (!axios || !cartId) return;

  try {
    const response = await axios.get(`/cart/id?cartId=${cartId}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getCartById: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getCartById');
    }
    console.error('getCartById error', error);
    throw new Error('getCartById error due to some reasone');
  }
};

export { getCart, updateCart, removeFromCart, clearCart, getCartById };
