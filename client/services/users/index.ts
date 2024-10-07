import { AxiosError, AxiosInstance } from 'axios';
import publicAxios from '../api';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) return;

  try {
    const response = await publicAxios.post('/user/login', {
      email,
      password,
    });

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in login: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in login');
    }
    console.error('login error', error);
    throw new Error('login error due to some reasone');
  }
};

const logout = async (axios: AxiosInstance) => {
  if (!axios) return;

  try {
    const response = await axios.get('/user/logout');

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in logout: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in logout');
    }
    console.error('logout error', error);
    throw new Error('logout error due to some reasone');
  }
};

const register = async ({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await publicAxios.post('/user/register', {
      userName,
      email,
      password,
    });
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in register: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in register');
    }
    console.error('register error', error);
    throw new Error('register error due to some reasone');
  }
};

const update = async ({
  data,
  axios,
}: {
  data: Partial<IUser>;
  axios: AxiosInstance;
}) => {

  const isEmpty = !( data?.email || data?.phone || data?.publicName || data?.avatarUrl );

  if(isEmpty) return ;
  
  const form = new FormData();
  if (data?.email) form.append('email', data.email);
  if (data?.publicName) form.append('publicName', data.publicName);
  if (data?.phone) form.append('phone', data.phone);
  if (data?.avatarUrl) form.append('avatar', data.avatarUrl);

  console.log('form data =>',{...form})

  try {
    const response = await axios.patch('/user/update', form, {
      headers:{
          'Content-Type':'multipart/form-data'
      }
  });

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in update: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in update');
    }
    console.error('update error', error);
    throw new Error('update error due to some reasone');
  }
};

const deleteUser = async (axios: AxiosInstance) => {
  if (!axios) return;

  try {
    const response = await axios.delete('/user/delete');

    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in deleteUser: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in deleteUser');
    }
    console.error('deleteUser error', error);
    throw new Error('deleteUser error due to some reasone');
  }
};

const getUser = async (axios: AxiosInstance) => {
  try {
    const response = await axios.get('/user');
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // server error
      const serverError = error?.response?.data;

      console.log(`server error in getUser: ${serverError?.message}`);

      throw new Error(serverError?.message || 'server error in getUser');
    }
    console.error('getUser error', error);
    throw new Error('getUser error due to some reasone');
  }
};

export { login, logout, register, update, deleteUser, getUser };
