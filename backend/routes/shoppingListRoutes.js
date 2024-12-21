import express from 'express';
import { body, validationResult } from 'express-validator';
import { getShoppingList, addMultipleItems, updateItem, deleteMultipleItems } from '../controllers/shoppingListController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Validation for add-multiple items
const validateAddMultipleItems = [
    body('items')
        .isArray()
        .withMessage('Items must be an array')
        .notEmpty()
        .withMessage('Items array cannot be empty'),
    body('items.*.name')
        .notEmpty()
        .withMessage('Item name is required')
        .isString()
        .withMessage('Item name must be a string'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
    body('items.*.unit')
        .optional()
        .isString()
        .withMessage('Unit must be a string')
];

// Validation for delete-multiple items
const validateDeleteMultipleItems = [
    body('itemIds')
        .isArray()
        .withMessage('Item IDs must be an array')
        .notEmpty()
        .withMessage('Item IDs array cannot be empty'),
    body('itemIds.*')
        .isMongoId()
        .withMessage('Each item ID must be a valid MongoDB ObjectId')
];

// Generic validation result handler
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Routes
router.get('/', authMiddleware, getShoppingList);

router.put('/update/:itemId', authMiddleware, updateItem);

router.post('/add-multiple', authMiddleware, validateAddMultipleItems, validateRequest, addMultipleItems);

router.delete('/delete-multiple', authMiddleware, validateDeleteMultipleItems, validateRequest, deleteMultipleItems);

export default router;