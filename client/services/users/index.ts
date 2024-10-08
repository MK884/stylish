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
  const isEmpty = !(
    data?.email ||
    data?.phone ||
    data?.publicName ||
    data?.avatarUrl
  );

  if (isEmpty) return;

  const formData = new FormData();
  if (data?.email) formData.append('email', data.email);
  if (data?.publicName) formData.append('publicName', data.publicName);
  if (data?.phone) formData.append('phone', data.phone);
  if (data?.avatarUrl) {
    const uriArray = data.avatarUrl.split('.');
    const type = uriArray[uriArray.length - 1];
    const response = await fetch(data.avatarUrl);
    const blob = await response.blob();
    console.log(blob);
    
    // formData.append('avatar', new File([blob], `avatar.${type}`, { type: `image/${type}` }));
    // Convert the image at the URI to a Blob
    // const blob = await fetch(data.avatarUrl).then(res => res.blob());
    // formData.append('avatar',  blob, 'avatar.jpg')
    // @ts-ignore
    // formData.append('avatar', {
    //   uri: data.avatarUrl,
    //   name: `image/${type}`,
    //   type: `image/${type}`
    // })
  }

  console.log('form data =>', { ...formData });

  try {
    const response = await axios.patch('/user/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

export { deleteUser, getUser, login, logout, register, update };

