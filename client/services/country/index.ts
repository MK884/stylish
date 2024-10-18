import { AxiosError, AxiosInstance } from 'axios';

const getCountries = async (axios: AxiosInstance) => {
  if (!axios) return;
  try {
    const response = await axios.get('/countries');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getCountries: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getCountries');
    }
    console.error('getCountries error', error);
    throw new Error('getCountries error due to some reasone');
  }
};

const getStates = async ({
  iso2,
  axios,
}: {
  axios: AxiosInstance;
  iso2: string;
}) => {
  try {
    const response = await axios.get(`/countries/${iso2}/states`);

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getStates: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getStates');
    }
    console.error('getStates error', error);
    throw new Error('getStates error due to some reasone');
  }
};

const getCities = async ({
  axios,
  ciso2,
  siso2,
}: {
  axios: AxiosInstance;
  ciso2: string;
  siso2: string;
}) => {
  try {
    const response = await axios.get(
      `/countries/${ciso2}/states/${siso2}/cities`
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getcities: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getcities');
    }
    console.error('getcities error', error);
    throw new Error('getcities error due to some reasone');
  }
};

export { getCountries, getCities, getStates };
