/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("Connected to mongodb.")
})
.catch((error) => {
  console.log(error.reason);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientID', (req, res) => {
  res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400: 500;
  res.status(status).send({ message: err.message});
});
app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
