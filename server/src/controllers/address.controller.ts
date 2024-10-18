import { Request, Response } from 'express';
import { Address, IAddress, User } from '../models';

const addAddress = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  const { address, city, country, fullName, phone, pincode, state, type } =
    req?.body;

  const isEmpty =
    !address && !city && !country && !fullName && !phone && !pincode && !state;

  if (isEmpty) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'Please enter required fields',
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
      return;
    }

    const addressObj: { [key: string]: any } = {
      address,
      city,
      country,
      fullName,
      phone,
      pincode,
      state,
      userId,
    };

    if (type === 'home' || type === 'work') {
      addressObj.type = type;
    } else {
      addressObj.type = 'home';
    }

    const response = await Address.create(addressObj);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'address added successfully',
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const getAddress = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
      return;
    }

    const response = await Address.find({
      userId,
    });

    if (!response) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'address not found',
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'address fetch success',
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const updateAddress = async (req: Request, res: Response) => {
  const { addressId } = req?.params;
  const { address, city, country, fullName, phone, pincode, state, type } =
    req?.body as Partial<IAddress>;
  const userId = req?.user?._id;

  if (!addressId) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'addressId required',
    });
    return;
  }

  const isExist =
    !!address ||
    !!city ||
    !!country ||
    !!fullName ||
    !!phone ||
    !!pincode ||
    !!state ||
    !!type;

  if (!isExist) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'at least one field required to perform update',
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
      return;
    }

    const data: Partial<IAddress> = {};

    if (address) data.address = address;
    if (city) data.city = city;
    if (country) data.country = country;
    if (fullName) data.fullName = fullName;
    if (phone) data.phone = phone;
    if (state) data.state = state;
    if (type) data.type = type;
    if (pincode) data.pincode = pincode;

    const response = await Address.findByIdAndUpdate(
      addressId,
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'address updated successfully',
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const deleteAddress = async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const { addressId } = req?.params;

  if (!addressId) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid addressId',
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
      return;
    }

    const response = await Address.findByIdAndDelete(addressId);

    if (!response) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'address not found',
      });
      return;
    }

    res.status(202).json({
      statusCode: 202,
      success: true,
      message: 'address deleted',
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

const getAddressById = async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const { addressId } = req?.params;

  if (!addressId) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid addressId',
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
      return;
    }

    const response = await Address.findById(addressId);

    if (!response) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'address not found',
      });
      return;
    }

    res.status(202).json({
      statusCode: 202,
      success: true,
      message: 'address fetch',
      data: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
        error,
      });
    }
  }
};

export { getAddress, addAddress, updateAddress, deleteAddress, getAddressById };
