// src/services/api.js
const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// ─── Auth ───────────────────────────────────
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export const register = async (name, email, password, phone, selectedServices = []) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, phone, selectedServices })
  });
  return await res.json();
};

export const verifyOtp = async (email, otp) => {
  const res = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, otp })
  });
  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export const getMe = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: getHeaders()
  });
  return await res.json();
};

// ─── Products ────────────────────────────────
export const getProducts = async (params = {}) => {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  
  let filtered = [...data];
  
  if (params.category) {
    // Check if the product's category or its parent category matches the requested name
    filtered = filtered.filter(p => {
       const catName = p.Category?.name?.toUpperCase() || '';
       const parentName = p.Category?.parent?.name?.toUpperCase() || '';
       const target = params.category.toUpperCase();
       return catName === target || parentName === target;
    });
  }

  // Map backend structure to frontend structure expected by cards
  return filtered.map(p => ({
     ...p,
     title: p.name,
     image: p.images?.[0] || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
     category: p.Category?.parent?.name || p.Category?.name,
     subcategory: p.Category?.parentId ? p.Category?.name : ''
  }));
};

export const getProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  return await res.json();
};

// ─── CMS (Still Mocked unless we build the CMS backend) ────────────────────────────────────
// ─── CMS Live Integration ────────────────────────────────────
export const getPage = async (slug) => {
  const res = await fetch(`${API_URL}/cms/pages/${slug}`, {
    headers: getHeaders()
  });
  const data = await res.json();
  // Transform the blockMap back to an array for the CMSEditor component
  const blocksArray = data.blocks ? Object.values(data.blocks) : [];
  return { ...data.page, blocks: blocksArray };
};

export const getAllPages = async () => {
  const res = await fetch(`${API_URL}/cms/pages`, {
    headers: getHeaders()
  });
  return await res.json();
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return await res.json();
};

export const bulkUploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  const res = await fetch(`${API_URL}/upload/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return await res.json();
};


// ─── CMS Updates ─────────────────────────────
export const updatePage = async (slug, data) => ({ message: 'Updated' });

export const updateBlock = async (blockId, data) => {
  const res = await fetch(`${API_URL}/cms/blocks`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ id: blockId, data }) 
  });
  return await res.json();
};

export const addBlock = async (data) => {
  const res = await fetch(`${API_URL}/cms/blocks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  return await res.json();
};

export const deleteBlock = async (blockId) => {
  const res = await fetch(`${API_URL}/cms/blocks/${blockId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  return await res.json();
};
export const standardizeAllBlocks = async () => ({ message: 'Standardized' });

export const resendOtp = async (email) => {
  const res = await fetch(`${API_URL}/auth/resend-otp`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email })
  });
  return await res.json();
};

// ─── Products Extended ───────────────────────
export const createProduct = async (data) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  return await res.json();
};

export const updateProduct = async (id, data) => {
  return { message: 'Update not implemented yet' };
};

export const deleteProduct = async (id) => {
  return { message: 'Delete not implemented yet' };
};

// ─── Site Settings ───────────────────────────
export const getSetting = async (key) => mockSettings[key] || {};
export const getAllSettings = async () => mockSettings;
export const updateSetting = async (key, data) => ({ message: 'Updated' });

// ─── Quotes ──────────────────────────────────
export const submitQuote = async (data) => submitContact(data); // Map to our new inquiry system
export const getQuotes = async (status) => [];
export const updateQuoteStatus = async (id, status) => ({ message: 'Updated' });
export const deleteQuote = async (id) => ({ message: 'Deleted' });

// ─── Contacts Extended ───────────────────────
export const submitContact = async (data) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  return await res.json();
};

export const getContacts = async () => [];
export const updateContactStatus = async (id, status) => ({ message: 'Updated' });
export const deleteContact = async (id) => ({ message: 'Deleted' });

// ─── Form Config ──────────────────────────────
export const getFormConfig = async (slug) => ({ slug, fields: [] });
export const updateFormConfig = async (slug, data) => ({ message: 'Updated' });

// ─── User Management ─────────────────────────
export const getUsers = async (params = {}) => [];
export const getUser = async (id) => ({});
export const updateUser = async (id, data) => ({ message: 'Updated' });
export const deleteUser = async (id) => ({ message: 'Deleted' });
export const getUsersExportUrl = () => '#';

// ─── Auth Extended ───────────────────────────
export const forgotPassword = async (email) => {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email })
  });
  return await res.json();
};

export const resetPassword = async (email, otp, newPassword) => {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, otp, newPassword })
  });
  return await res.json();
};
