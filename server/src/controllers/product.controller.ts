import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models';
import { ParsedQs } from 'qs';

// Function to safely convert query parameters to array
const toArray = (
  value: string | string[] | ParsedQs | ParsedQs[] | undefined
): string[] => {
  if (typeof value === 'string') {
    return value.split(','); // Split if it's a comma-separated string
  } else if (Array.isArray(value)) {
    return value.filter((v) => typeof v === 'string') as string[]; // Ensure it's an array of strings
  }
  return [];
};

const getAllProducts = async (req: Request, res: Response) => {
  const { page, limit, search, color, size, category, brand } = req?.query;

  let currentPage = Number(page) || 0;
  let docLimit = Number(limit) || 10;
  let searchDoc = search || '';

  const colorArray = toArray(color);
  const sizearray = toArray(size).map(Number);

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
          ...(colorArray.length ? { color: { $in: colorArray } } : {}),
          ...(brand ? { 'store.name': { $regex: brand, $options: 'i' } } : {}),
          ...(sizearray.length
            ? {
                size: {
                  $in: sizearray,
                },
              }
            : {}),
          ...(category ? { $expr: { $eq: ['$category', category] } } : {}),
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
    };

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'fetch successfully',
      data,
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

const getProductsByStoreId = async (req: Request, res: Response) => {
  const { id } = req?.params;

  if (!id) {
    res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'invalid id',
    });
    return;
  }

  try {
    const response = await Product.aggregate([
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
          'store._id': new mongoose.Types.ObjectId(id),
        },
      },
    ]);

    if (!response.length) {
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

export { getAllProducts, getProductById, getProductsByStoreId };
