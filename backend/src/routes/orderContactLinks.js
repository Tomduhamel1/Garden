const express = require('express');
const router = express.Router();
const orderContactLinksController = require('../controllers/orderContactLinksController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// Order-specific contact management
router.get('/orders/:orderId/contacts', orderContactLinksController.getOrderContacts);
router.post('/orders/:orderId/contacts', orderContactLinksController.linkContactToOrder);
router.put('/orders/:orderId/contacts/:linkId', orderContactLinksController.updateContactOverrides);
router.delete('/orders/:orderId/contacts/:linkId', orderContactLinksController.unlinkContactFromOrder);
router.put('/orders/:orderId/contacts', orderContactLinksController.replaceOrderContacts);

// Contact history
router.get('/contacts/:globalContactId/history', orderContactLinksController.getContactHistory);

module.exports = router;