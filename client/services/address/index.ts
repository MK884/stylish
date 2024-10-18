import { AxiosError, AxiosInstance } from 'axios';

const getAddress = async (axios: AxiosInstance) => {
  if (!axios) return;

  try {
    const response = await axios.get('/address');

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getAddress: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getAddress');
    }
    console.error('getAddress error', error);
    throw new Error('getAddress error due to some reasone');
  }
};

const addAddress = async ({
  axios,
  data,
}: {
  data: Partial<IAddress>;
  axios: AxiosInstance;
}) => {
  if (!axios) return;

  if (
    !data?.address &&
    !data?.city &&
    !data?.country &&
    !data?.fullName &&
    !data?.phone &&
    !data?.pincode &&
    !data?.state
  )
    return;

  try {
    const response = await axios.post('/address', data);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in addAddress: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in addAddress');
    }
    console.error('addAddress error', error);
    throw new Error('addAddress error due to some reasone');
  }
};

const updateAddress = async ({
  axios,
  data,
  addressId,
}: {
  data: Partial<IAddress>;
  axios: AxiosInstance;
  addressId: string;
}) => {
  if (!axios && !addressId) return;

  if (!Object.keys(data).length) return;

  try {
    const response = await axios.patch(`/address/${addressId}`, data);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in updateAddress: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in updateAddress');
    }
    console.error('updateAddress error', error);
    throw new Error('updateAddress error due to some reasone');
  }
};

const deleteAddress = async ({
  addressId,
  axios,
}: {
  addressId: string;
  axios: AxiosInstance;
}) => {
  if (!addressId && !axios) return;

  try {
    const response = await axios.delete(`/address/${addressId}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in deleteAddress: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in deleteAddress');
    }
    console.error('deleteAddress error', error);
    throw new Error('deleteAddress error due to some reasone');
  }
};

const getAddressById = async ({
  addressId,
  axios,
}: {
  addressId: string;
  axios: AxiosInstance;
}) => {
  try {
    const response = await axios.get(`/address/${addressId}`);

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getAddressById: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getAddressById');
    }
    console.error('getAddressById error', error);
    throw new Error('getAddressById error due to some reasone');
  }
};

export { addAddress, getAddress, updateAddress, deleteAddress, getAddressById };
