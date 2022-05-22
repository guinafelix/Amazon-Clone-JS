/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';

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
app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientID', (req, res) => {
  res.send({clientId: process.env.PAYPAL_CLIENT_ID})
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.send(path.join(__dirname, '/../frontend/index.html'))
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400: 500;
  res.status(status).send({ message: err.message});
});
app.listen(process.env.APP_PORT || 5000, () => {
  console.log('serve at http://localhost:5000');
});
