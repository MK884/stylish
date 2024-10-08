import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models';

const getAllProducts = async (req: Request, res: Response) => {
  const { page, limit, search, color, size, category } = req?.query;

  let currentPage = Number(page) || 0;
  let docLimit = Number(limit) || 10;
  let searchDoc = search || '';

  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $match: {
          $or: [
            {
              title: { $regex: searchDoc, $options: 'i' },
            },
            {
              'store.name': { $regex: searchDoc, $options: 'i' },
            },
          ],
          ...(color ? { color: { $regex: color, $options: 'i' } } : {}),
          ...(size
            ? {
                size: {
                  $in: [Number(size)],
                },
              }
            : {}),
          ...(category
            ? { category: { $regex: category, $options: 'i' } }
            : {}),
        },
      },
      {
        $skip: currentPage * docLimit,
      },
      {
        $limit: docLimit,
      },
    ]);

    const total = await Product.find().countDocuments();

    const data = {
      products,
      total,
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'fetch successfully',
      data
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

const getProductById = async (req: Request, res: Response) => {
  const { id } = req?.params;

  if (!id) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid product id',
    });
    return;
  }

  try {
    const product = await Product.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
    ]);

    if (!product) {
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
      message: 'product found',
      data: product,
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

export { getAllProducts, getProductById };
