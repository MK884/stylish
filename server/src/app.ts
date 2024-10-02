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

// user routes

import { userRouter } from './routes';
app.use('/api/v1/user', userRouter);

export default app;
