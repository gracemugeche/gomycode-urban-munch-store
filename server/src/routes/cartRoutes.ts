import express from 'express';
import { body } from 'express-validator';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController';
import { protect } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

// Get the user's cart
router.get('/', protect, getCart);

// Add an item to the cart (with validation)
router.post(
  '/',
  protect,
  [
    body('product').notEmpty().withMessage('Product ID is required'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('image').notEmpty().withMessage('Image URL is required'),
  ],
  validateRequest,
  addToCart
);

// Remove item from cart
router.delete('/:productId', protect, removeFromCart);

export default router;
