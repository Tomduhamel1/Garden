const express = require('express');
const router = express.Router();
const globalContactsController = require('../controllers/globalContactsController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

// CRUD operations
router.get('/', globalContactsController.list);
router.post('/', globalContactsController.create);
router.get('/search', globalContactsController.search);
router.get('/:id', globalContactsController.getById);
router.put('/:id', globalContactsController.update);
router.delete('/:id', globalContactsController.delete);

// Additional operations
router.post('/:id/archive', globalContactsController.archive);
router.get('/:id/usage-stats', globalContactsController.getUsageStats);

module.exports = router;