import { Request, Response } from 'express';
import Order from '../models/orderModels';
import User from '../models/userModels';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

// Create a new order
export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { orderItems, deliveryAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ message: 'No order items provided' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // ✅ Prevent disabled users from placing orders
    const user = await User.findById(req.user._id);
    if (!user || !user.isActive) {
      res.status(403).json({ message: 'Your account is disabled. You cannot place orders.' });
      return;
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      deliveryAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// Get all orders (admin only)
export const getOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('deliveryWorker' , 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// Get current logged-in user's orders
export const getMyOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: 'Server error while fetching your orders' });
  }
};

// Get a single order by ID
export const getOrderById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const userId = req.user?._id.toString();
    const isAdmin = req.user?.isAdmin;

    if (order.user._id.toString() !== userId && !isAdmin) {
      res.status(403).json({ message: 'Not authorized to view this order' });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching order' });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const { isPaid, isDelivered } = req.body;

    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      if (isPaid) order.paidAt = new Date();
    }

    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      if (isDelivered) order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error while updating order' });
  }
};

// Delete an order (admin only)
export const deleteOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    await order.deleteOne();
    res.json({ message: 'Order removed successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error while deleting order' });
  }
};
