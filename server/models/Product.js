const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,  // relaxed so bulk imports don't fail
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  // ── Direct string fields (used by CMS admin UI) ──────────────────────────
  category: {
    type: DataTypes.STRING,
    allowNull: true   // e.g. 'Furniture', 'Sports'
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true   // e.g. 'Desks', 'Seating'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isNewProduct: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  stats: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  resources: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  featuresTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  executionTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ctaLabel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ctaLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  chatLabel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  chatLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // ── Legacy / relational fields ────────────────────────────────────────────
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  features: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  isInstitutional: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('active', 'draft', 'archived'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

// Associations
Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = Product;


