import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, BarChart3, Users, Globe, UserCircle, Bell, Download, FileText, TrendingUp, AlertCircle, Search, Plus, Minus, Trash2, Edit, Save, Eye, Mail, Phone, MapPin, User, CreditCard, DollarSign, Star, Heart, Grid, List, X, Send, Upload, ChevronLeft, ChevronRight, Calendar, Filter, Settings, Info, CheckCircle } from 'lucide-react';

// Mock Data with enhanced product information
const initialProducts = [
  {
    id: 1,
    name: 'Premium Lace Cotton Fabric',
    brand: 'Excelsior',
    category: 'Cotton',
    price: 2500,
    stock: 45,
    description: 'High-quality cotton fabric with intricate lace patterns. Perfect for traditional and modern clothing designs. Features breathable material with elegant floral patterns.',
    colors: ['White', 'Cream', 'Light Blue'],
    patterns: 'Floral Lace',
    material: '100% Cotton',
    width: '45 inches',
    availableLengths: [2, 3, 4, 5, 6],
    images: ['/api/placeholder/300/300'],
    sku: 'EXC-LC-001',
    minStock: 20
  },
  {
    id: 2,
    name: 'Geometric Pattern Lace',
    brand: 'Getzner',
    category: 'Lace',
    price: 3200,
    stock: 32,
    description: 'Modern geometric patterns in premium lace material. Swiss quality lace with contemporary designs suitable for special occasions.',
    colors: ['White', 'Gold', 'Silver'],
    patterns: 'Geometric',
    material: '90% Cotton, 10% Polyester',
    width: '48 inches',
    availableLengths: [3, 4, 5, 6, 8],
    images: ['/api/placeholder/300/300'],
    sku: 'GET-GL-002',
    minStock: 15
  },
  {
    id: 3,
    name: 'Striped Wool Suiting',
    brand: 'Bouer',
    category: 'Wool',
    price: 4500,
    stock: 28,
    description: 'Professional suiting material with subtle stripes. Premium wool fabric ideal for business suits and formal wear.',
    colors: ['Navy', 'Charcoal', 'Brown'],
    patterns: 'Pinstripe',
    material: '100% Wool',
    width: '60 inches',
    availableLengths: [2, 3, 4],
    images: ['/api/placeholder/300/300'],
    sku: 'BOU-WS-003',
    minStock: 10
  }
];

const initialOrders = [
  {
    id: 1001,
    customer: 'Amina Hassan',
    customerId: 1,
    phone: '+234 801 234 5678',
    email: 'amina.hassan@email.com',
    address: 'Plot 45, Ahmadu Bello Way, Kano',
    total: 12500,
    status: 'Processing',
    paymentMethod: 'Card',
    date: '2024-08-06',
    items: [
      { name: 'Premium Lace Cotton Fabric', quantity: 2, price: 2500, color: 'White', length: 5 },
      { name: 'Geometric Pattern Lace', quantity: 1, price: 3200, color: 'Gold', length: 4 }
    ]
  },
  {
    id: 1002,
    customer: 'Fatima Abdullahi',
    customerId: 2,
    phone: '+234 803 567 8901',
    email: 'fatima.a@email.com',
    address: 'House 12, Yakubu Gowon Crescent, Abuja',
    total: 9000,
    status: 'Completed',
    paymentMethod: 'Cash',
    date: '2024-08-05',
    items: [
      { name: 'Striped Wool Suiting', quantity: 2, price: 4500, color: 'Navy', length: 3 }
    ]
  }
];

const initialCustomers = [
  {
    id: 1,
    name: 'Amina Hassan',
    email: 'amina.hassan@email.com',
    phone: '+234 801 234 5678',
    address: 'Plot 45, Ahmadu Bello Way, Kano',
    type: 'Retail',
    status: 'VIP',
    totalOrders: 15,
    totalSpent: 87500,
    joinDate: '2023-05-15',
    purchaseHistory: []
  },
  {
    id: 2,
    name: 'Fatima Abdullahi',
    email: 'fatima.a@email.com',
    phone: '+234 803 567 8901',
    address: 'House 12, Yakubu Gowon Crescent, Abuja',
    type: 'Wholesale',
    status: 'Active',
    totalOrders: 25,
    totalSpent: 125000,
    joinDate: '2023-03-22',
    purchaseHistory: []
  }
];

// Product Modal Component
const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedLength, setSelectedLength] = useState(product.availableLengths[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product.stock < quantity) {
      alert('Insufficient stock!');
      return;
    }
    onAddToCart({
      ...product,
      selectedColor,
      selectedLength,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Product Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center mb-4">
                <Package className="w-20 h-20 text-gray-400" />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Width:</strong> {product.width}</p>
                <p><strong>Pattern:</strong> {product.patterns}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
              <p className="text-3xl font-bold text-blue-600 mb-4">₦{product.price.toLocaleString()}/yard</p>
              
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Color:</label>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded border ${
                        selectedColor === color
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Length (yards):</label>
                <select
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {product.availableLengths.map(length => (
                    <option key={length} value={length}>{length} yards</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded border hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border rounded text-center"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded border hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                </p>
                <p className="text-lg font-semibold mt-2">
                  Total: ₦{(product.price * selectedLength * quantity).toLocaleString()}
                </p>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 rounded-lg font-medium ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add/Edit Product Modal
const AddProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    brand: '',
    category: 'Cotton',
    price: '',
    stock: '',
    description: '',
    colors: [''],
    patterns: '',
    material: '',
    width: '',
    availableLengths: [2],
    sku: '',
    minStock: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: product?.id || Date.now(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      colors: formData.colors.filter(c => c.trim()),
      availableLengths: formData.availableLengths.filter(l => l > 0)
    });
    onClose();
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, ''] });
  };

  const updateColor = (index, value) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData({ ...formData, colors: newColors });
  };

  const removeColor = (index) => {
    setFormData({ ...formData, colors: formData.colors.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name*</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Brand*</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category*</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cotton">Cotton</option>
                <option value="Lace">Lace</option>
                <option value="Wool">Wool</option>
                <option value="Silk">Silk</option>
                <option value="Polyester">Polyester</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">SKU*</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price (₦)*</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity*</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Stock Alert</label>
              <input
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 100% Cotton"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Width</label>
              <input
                type="text"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 45 inches"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Pattern</label>
              <input
                type="text"
                value={formData.patterns}
                onChange={(e) => setFormData({ ...formData, patterns: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Available Colors</label>
            {formData.colors.map((color, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter color"
                />
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColor}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Color
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Upload Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Customer Modal
const AddCustomerModal = ({ customer, onSave, onClose }) => {
  const [formData, setFormData] = useState(customer || {
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Retail',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: customer?.id || Date.now(),
      totalOrders: customer?.totalOrders || 0,
      totalSpent: customer?.totalSpent || 0,
      joinDate: customer?.joinDate || new Date().toISOString().split('T')[0],
      purchaseHistory: customer?.purchaseHistory || []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{customer ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name*</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone*</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows="2"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Customer Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="VIP">VIP</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {customer ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Enhanced Cart Component
const CartDrawer = ({ cart, setCart, isOpen, onClose }) => {
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
    } else {
      const newCart = [...cart];
      newCart[index].quantity = newQuantity;
      setCart(newCart);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => 
      sum + (item.price * item.selectedLength * item.quantity), 0
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="w-96 bg-white h-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart ({cart.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Color: {item.selectedColor}</p>
                    <p>Length: {item.selectedLength} yards</p>
                    <p>Price: ₦{item.price.toLocaleString()}/yard</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-semibold">
                      ₦{(item.price * item.selectedLength * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="sticky bottom-0 bg-white border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ₦{getTotal().toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Enhanced Dashboard Component with navigation
const Dashboard = ({ products, orders, customers, onNavigateToTab }) => {
  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, product) => sum + product.stock, 0),
    lowStockItems: products.filter(product => product.stock < product.minStock).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'Processing').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalCustomers: customers.length,
    vipCustomers: customers.filter(c => c.status === 'VIP').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₦{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigateToTab('orders')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              <p className="text-xs text-orange-600 mt-1">{stats.pendingOrders} pending</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigateToTab('customers')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalCustomers}</p>
              <p className="text-xs text-green-600 mt-1">{stats.vipCustomers} VIP</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigateToTab('inventory')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Alert</p>
              <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
              <p className="text-xs text-gray-500 mt-1">Items need reorder</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium">#{order.id} - {order.customer}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₦{order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Low Stock Alert</h3>
          <div className="space-y-3">
            {products.filter(product => product.stock < product.minStock).map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{product.stock} units</p>
                  <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                </div>
              </div>
            ))}
            {products.filter(product => product.stock < product.minStock).length === 0 && (
              <p className="text-gray-500 text-center py-4">All products are well stocked!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Inventory Component
const Inventory = ({ products, setProducts }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([...products, product]);
    }
    setEditingProduct(null);
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow border overflow-hidden">
              <div 
                className="h-48 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() => setSelectedProduct(product)}
              >
                <Package className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand} • {product.category}</p>
                <p className="text-xl font-bold text-blue-600 mb-2">₦{product.price.toLocaleString()}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm font-medium ${
                    product.stock < product.minStock ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {product.stock} in stock
                  </span>
                  <span className="text-xs text-gray-500">Min: {product.minStock}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowAddModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                  >
                    <Edit className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.sku}</td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 font-semibold">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      product.stock < product.minStock ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowAddModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <AddProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {}}
        />
      )}
    </div>
  );
};

// Customer Management Component with Purchase History
const CustomerManagement = ({ customers, setCustomers, orders }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSaveCustomer = (customer) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === customer.id ? customer : c));
    } else {
      setCustomers([...customers, customer]);
    }
    setEditingCustomer(null);
    setShowAddModal(false);
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter(order => order.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => {
          const customerOrders = getCustomerOrders(customer.id);
          return (
            <div key={customer.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                  customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="truncate">{customer.address}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm font-semibold">₦{customer.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{customer.totalOrders} orders</p>
                  </div>
                  <p className="text-xs text-gray-500">Since {customer.joinDate}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
                  >
                    View History
                  </button>
                  <button
                    onClick={() => {
                      setEditingCustomer(customer);
                      setShowAddModal(true);
                    }}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <AddCustomerModal
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onClose={() => {
            setShowAddModal(false);
            setEditingCustomer(null);
          }}
        />
      )}

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Purchase History - {selectedCustomer.name}</h2>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {getCustomerOrders(selectedCustomer.id).length === 0 ? (
                <p className="text-center text-gray-500 py-8">No purchase history available</p>
              ) : (
                <div className="space-y-4">
                  {getCustomerOrders(selectedCustomer.id).map(order => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₦{order.total.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} ({item.color}, {item.length} yards) x{item.quantity}</span>
                            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState(initialCustomers);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Low stock: Textured Premium Denim (12 units)', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New order #1004 received', time: '1 day ago' }
  ]);

  const handleAddToCart = (productWithSelection) => {
    setCart([...cart, productWithSelection]);
    alert(`${productWithSelection.name} added to cart!`);
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'pos', name: 'Point of Sale', icon: ShoppingCart },
    { id: 'ecommerce', name: 'E-Commerce', icon: Globe },
    { id: 'orders', name: 'Orders', icon: FileText },
    { id: 'customers', name: 'Customers', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">AYB</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-gray-900">AYB Textiles NG</h1>
                <p className="text-xs text-gray-600">Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <UserCircle className="w-8 h-8 text-gray-600" />
                <span className="text-sm text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            products={products} 
            orders={orders} 
            customers={customers}
            onNavigateToTab={setActiveTab}
          />
        )}
        
        {activeTab === 'inventory' && (
          <Inventory products={products} setProducts={setProducts} />
        )}
        
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
                <div className="flex gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products or scan barcode..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Categories</option>
                    <option>Cotton</option>
                    <option>Lace</option>
                    <option>Wool</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="font-semibold mb-4">Quick Add Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-3 border rounded-lg hover:shadow-md transition-all ${
                        product.stock === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-blue-400'
                      }`}
                      disabled={product.stock === 0}
                    >
                      <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">₦{product.price.toLocaleString()}</p>
                      <p className={`text-xs mt-1 ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                        Stock: {product.stock}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border sticky top-32">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Current Sale</h3>
                    <span className="text-sm text-gray-500">#{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100">
                      <User className="w-4 h-4 inline mr-1" />
                      Walk-in Customer
                    </button>
                    <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 max-h-96 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No items in current sale</p>
                      <p className="text-xs mt-1">Click products to add them</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-600">
                                {item.selectedColor} • {item.selectedLength} yards
                              </p>
                            </div>
                            <button
                              onClick={() => setCart(cart.filter((_, i) => i !== index))}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  const newCart = [...cart];
                                  newCart[index].quantity = Math.max(1, item.quantity - 1);
                                  setCart(newCart);
                                }}
                                className="w-7 h-7 rounded border hover:bg-white flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newCart = [...cart];
                                  newCart[index].quantity = Math.max(1, parseInt(e.target.value) || 1);
                                  setCart(newCart);
                                }}
                                className="w-12 px-1 py-1 border rounded text-center text-sm"
                              />
                              <button
                                onClick={() => {
                                  const newCart = [...cart];
                                  newCart[index].quantity = item.quantity + 1;
                                  setCart(newCart);
                                }}
                                className="w-7 h-7 rounded border hover:bg-white flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold">
                              ₦{(item.price * item.selectedLength * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <div className="p-4 border-t">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₦{cart.reduce((sum, item) => sum + (item.price * item.selectedLength * item.quantity), 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (7.5%):</span>
                        <span>₦{(cart.reduce((sum, item) => sum + (item.price * item.selectedLength * item.quantity), 0) * 0.075).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span className="text-blue-600">
                          ₦{(cart.reduce((sum, item) => sum + (item.price * item.selectedLength * item.quantity), 0) * 1.075).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium">
                        <CreditCard className="w-4 h-4 inline mr-1" />
                        Card
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Cash
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setCart([])}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm"
                      >
                        Clear Sale
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Complete Sale
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'ecommerce' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-2">Online Store</h2>
              <p className="text-blue-100">Browse our premium textile collection</p>
            </div>
            
            <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search fabrics..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Cotton</option>
                <option>Lace</option>
                <option>Wool</option>
              </select>
              <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow border overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 relative group"
                    onClick={() => {
                      const modal = document.createElement('div');
                      modal.id = 'product-modal';
                      document.body.appendChild(modal);
                      const root = ReactDOM.createRoot(modal);
                      root.render(
                        <ProductModal
                          product={product}
                          onClose={() => {
                            root.unmount();
                            document.body.removeChild(modal);
                          }}
                          onAddToCart={handleAddToCart}
                        />
                      );
                    }}
                  >
                    <Package className="w-16 h-16 text-gray-400" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <span className="text-white bg-blue-600 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        Quick View
                      </span>
                    </div>
                    {product.stock < 20 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Low Stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-gray-500">(4.0)</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-bold text-blue-600">₦{product.price.toLocaleString()}</span>
                      <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                      </span>
                    </div>
                    {product.colors && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                          product.stock === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 inline mr-1" />
                        Add to Cart
                      </button>
                      <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="flex gap-2">
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Orders</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">#{order.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-xs text-gray-600">{order.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.items.length} items</td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">₦{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm">{order.paymentMethod}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              const modal = document.createElement('div');
                              modal.innerHTML = `
                                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                  <div class="bg-white rounded-lg max-w-2xl w-full p-6">
                                    <h3 class="text-xl font-bold mb-4">Order Details #${order.id}</h3>
                                    <div class="space-y-3">
                                      <p><strong>Customer:</strong> ${order.customer}</p>
                                      <p><strong>Email:</strong> ${order.email}</p>
                                      <p><strong>Phone:</strong> ${order.phone}</p>
                                      <p><strong>Address:</strong> ${order.address}</p>
                                      <p><strong>Payment:</strong> ${order.paymentMethod}</p>
                                      <div class="border-t pt-3">
                                        <h4 class="font-semibold mb-2">Order Items:</h4>
                                        ${order.items.map(item => `
                                          <div class="flex justify-between py-1">
                                            <span>${item.name} (${item.color}, ${item.length} yards) x${item.quantity}</span>
                                            <span>₦${(item.price * item.quantity).toLocaleString()}</span>
                                          </div>
                                        `).join('')}
                                      </div>
                                      <div class="border-t pt-3 flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>₦${order.total.toLocaleString()}</span>
                                      </div>
                                    </div>
                                    <button onclick="this.closest('.fixed').remove()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                      Close
                                    </button>
                                  </div>
                                </div>
                              `;
                              document.body.appendChild(modal);
                            }}
                            className="text-blue-600 hover:text-blue-900 text-sm mr-3"
                          >
                            View Details
                          </button>
                          <button className="text-green-600 hover:text-green-900 text-sm">
                            Update Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'customers' && (
          <CustomerManagement 
            customers={customers} 
            setCustomers={setCustomers}
            orders={orders}
          />
        )}
      </main>

      {/* Product Modal for POS and E-commerce */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer 
        cart={cart} 
        setCart={setCart} 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AYB TEXTILES NG</h3>
              <p className="text-gray-300 mb-4">
                Dealers in all kinds of textile materials - wholesale and retail. 
                Quality fabrics for every occasion since 2018.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>+234 703 646 6660</p>
                <p>+234 701 715 1556</p>
                <p>info@aybtextiles.ng</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Locations</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Kano - Kantin Kwari Market</p>
                <p>Kano - Hospital Road</p>
                <p>Abuja - Wuse 2</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Premium Brands</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Excelsior • Getzner</p>
                <p>• Bouer • Filtex</p>
                <p>• Vice Chairman</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 AYB Textiles NG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;