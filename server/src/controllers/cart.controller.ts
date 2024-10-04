import { Request, Response } from 'express';
import { Cart, Product } from '../models';
import mongoose from 'mongoose';

const getAllCartOfUser = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  try {
    const products = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'products',
          foreignField: '_id',
          localField: 'products.productId',
          as: 'product',
        },
      },
    ]);

    if (!products) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'product not found',
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'success',
      data: products,
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

const addToCart = async (req: Request, res: Response) => {
  const { productId, qty } = req?.params;

  const userId = req?.user?._id;

  const quantity = Number(qty || 0) || 1;

  if (!productId) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid product id',
    });
    return;
  }

  try {
    const isProductExists = await Product.findById(productId);
    

    if (!isProductExists) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'product not found',
      });
      return;
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // no existing product in cart add new one

      const newCart = await Cart.create(
        {
          userId,
          products: [
            {
              productId: new mongoose.Types.ObjectId(productId),
              quantity: quantity,
            },
          ],
        },
        { new: true }
      );

      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'product added into cart successfully',
        data: newCart,
      });
      return;
    }

    // check if product already exists
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: new mongoose.Types.ObjectId(productId),
        quantity: quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'updated cart details',
      data: cart,
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

const removeFromCart = async (req: Request, res: Response) => {
  const { productId } = req?.params;

  const userId = req?.user?._id;

  if (!productId) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid product id',
    });
    return;
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart?.products.length) {
      res.status(406).json({
        statusCode: 406,
        success: false,
        message: 'cart is empty',
      });
      return;
    }

    const isProductExists = cart.products.some(
      (product) => product.productId.toString() === productId
    );

    if (!isProductExists) {
      res.status(406).json({
        statusCode: 406,
        success: false,
        message: 'product not exists',
      });
      return;
    }

    cart.products = cart?.products.filter(
      (product) => product.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'product remove successfully',
      data: cart,
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

const clearCart = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || !cart.products.length) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Cart is already empty',
      });
      return;
    }

    cart.products = [];

    await cart.save();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Cart cleared successfully',
      data: cart,
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

export { getAllCartOfUser, addToCart, removeFromCart, clearCart };
