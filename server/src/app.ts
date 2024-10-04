import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const origin = process.env.ALLOWED_ORIGIN;
app.use(
  cors({
    origin,
    methods: '*',
    credentials: true,
  })
);

// middlewares
import { errorHandler } from './middlewares';


// user routes
import { userRouter, storeRoute, categoryRoute } from './routes';


app.use('/api/v1/user', userRouter);
app.use('/api/v1/store', storeRoute);
app.use('/api/v1/category', categoryRoute);

// @ts-ignore
app.use(errorHandler);
export default app;
