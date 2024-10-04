import { Request, Response } from 'express';
import { Categories } from '../models';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Categories.find();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'success',
      data: categories,
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

export { getAllCategories };
