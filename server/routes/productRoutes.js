const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, bulkRenameSubcategory } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Bulk rename — must be before /:id so Express doesn't treat the path as an ID
router.route('/bulk-rename-subcategory')
  .put(protect, admin, bulkRenameSubcategory);

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;


