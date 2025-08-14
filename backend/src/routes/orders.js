const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', orderController.create);
router.get('/', orderController.list);
router.get('/:id', orderController.getById);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

// Additional operations
router.patch('/:id/status', orderController.updateStatus);
router.post('/:id/lock', orderController.lock);
router.post('/:id/unlock', orderController.unlock);

module.exports = router;