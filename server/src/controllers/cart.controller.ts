import { Request, Response } from 'express';
import { Cart, Product } from '../models';
import mongoose from 'mongoose';

const getAllCartOfUser = async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  try {
    const cart = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'products',
          foreignField: '_id',
          localField: 'productId',
          as: 'product',
        },
      },
    ]);

    if (!cart.length) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'cart is empty',
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'success',
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

const addToCart = async (req: Request, res: Response) => {
  const { productId, qty, color, s } = req?.body;

  const userId = req?.user?._id;

  const quantity = Number.parseInt(qty || 0) || 1;
  const size = Number.parseInt(s);

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
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


    const cart = await Cart.find({
      userId,
    });

    if (!cart.length) {
      // no existing product in cart add new one

      if (!size || !color) {
        res.status(400).json({
          statusCode: 400,
          success: false,
          message: 'size and color not found',
        });
        return;
      }


      const newCart = await Cart.create({
        color,
        productId,
        quantity,
        size,
        userId
      })
      
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'product added into cart successfully',
        data: newCart,
      });
      return;

    }

    // check if product already exists
    const existingProductIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );


    if (existingProductIndex >= 0) {
      const quant = cart[existingProductIndex].quantity + quantity;
      const response = await Cart.findByIdAndUpdate(
        cart[existingProductIndex]._id,
        {
          $set: { quantity: quant },
        },
        {
          new: true,
        }
      );


      res.status(202).json({
        statusCode: 202,
        success: true,
        message: 'quantity updated successfully',
        data: response,
      });
      return;
    }


    if (!size || !color) {
      res.status(400).json({
        statusCode: 400,
        success: false,
        message: 'size and color not found',
      });
      return;
    }


    const newCart = await Cart.create(
      {
        userId,
        productId,
        quantity,
        size,
        color,
      }
     
    );

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'updated cart details',
      data: newCart,
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
    const carts = await Cart.find({ userId });

    if (!carts?.length) {
      res.status(406).json({
        statusCode: 406,
        success: false,
        message: 'cart is empty',
      });
      return;
    }

    const isProductExists = carts.some(
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

    const response = await Cart.deleteOne({
      productId,
    });

    const cart = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'products',
          foreignField: '_id',
          localField: 'productId',
          as: 'product',
        },
      },
    ]);


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

    if (!cart) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Cart is already empty',
      });
      return;
    }


    await Cart.deleteMany({ userId });

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Cart cleared successfully',
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
