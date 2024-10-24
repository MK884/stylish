import { Request, Response } from 'express';
import { Order } from '../models';
import mongoose from 'mongoose';
import { toArray } from './product.controller';

const placeOrder = async (req: Request, res: Response) => {
  const { addressId, cartId } = req?.body;
  const userId = req?.user._id;

  if (!addressId || !cartId) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'please provide addresId and cartId',
    });
    return;
  }

  const cartIdArray = toArray(cartId)
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  if (!cartIdArray?.length || !mongoose.Types.ObjectId.isValid(addressId)) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'please provide valid cartId and AddresId',
    });
    return;
  }

  try {
    const response = await Order.create({
      addressId,
      userId,
      cart: cartIdArray,
    });

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'order placed successfully',
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

const getOrdersOfUser = async (req: Request, res: Response) => {
  const userId = req?.user._id;

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'addresses',
          foreignField: '_id',
          localField: 'addressId',
          as: 'address',
        },
      },
      {
        $lookup: {
          from: 'carts',
          foreignField: '_id',
          localField: 'cart',
          as: 'cartDetails',
          pipeline: [
            {
              $lookup: {
                from: 'products',
                foreignField: '_id',
                localField: 'productId',
                as: 'product',
              },
            },
          ],
        },
      },
      // {
      //   $lookup: {
      //     from: 'products',
      //     foreignField: '_id',
      //     localField: 'cartDetails.productId',
      //     as: 'productDetails',
      //   },
      // }
    ]);

    if (!orders.length) {
      res.status(202).json({
        statusCode: 202,
        success: true,
        message: 'no orders found',
        data: orders,
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'fetch orders successfully',
      data: orders,
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

const getOrderById = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const { id } = req.params;

  if (!id || !userId || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid order id',
    });
    return;
  }

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'addresses',
          foreignField: '_id',
          localField: 'addressId',
          as: 'address',
        },
      },
      {
        $lookup: {
          from: 'carts',
          foreignField: '_id',
          localField: 'cart',
          as: 'cartDetails',
          pipeline: [
            {
              $lookup: {
                from: 'products',
                foreignField: '_id',
                localField: 'productId',
                as: 'product',
              },
            },
          ],
        },
      },
      // {
      //   $lookup: {
      //     from: 'products',
      //     foreignField: '_id',
      //     localField: 'cartDetails.productId',
      //     as: 'productDetails',
      //   },
      // },
    ]);

    if (!orders.length) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'no orders found',
        data: orders,
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'fetch orders successfully',
      data: orders[0],
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

const cancelOrder = async (req: Request, res: Response) => {
  const { id } = req?.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid order id',
    });
    return;
  }

  try {
    const response = await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: 'cancelled' },
      },
      { new: true }
    );

    if (!response) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'no order found',
      });
      return;
    }

    res.status(202).json({
      statusCode: 202,
      success: false,
      message: 'order cancel successfully',
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

export { placeOrder, getOrdersOfUser, getOrderById, cancelOrder };
