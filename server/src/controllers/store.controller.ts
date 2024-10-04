import { Request, Response } from 'express';
import { Store } from '../models';

const getAllStore = async (_: Request, res: Response) => {
  try {
    const stores = await Store.find();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'success',
      data: stores,
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

const getStoreById = async (req: Request, res: Response) => {
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
    const store = await Store.findById(id);
    if (!store) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'store not found',
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'store found',
      data: store,
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

export { getAllStore, getStoreById };
