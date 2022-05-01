import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import {isAuth} from '../utils';

const orderRouter = express.Router();
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}));
orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not found' });
        }
    })
);
orderRouter.post(
    '/', 
    isAuth, 
    expressAsyncHandler(async (req, res) => {
        const order = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New order Created', order: createdOrder})
    })
);
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order paid', order: updatedOrder});
    } else {
        res.status(404).send({ message: 'Order not found.'});
    }
}))
export default orderRouter;