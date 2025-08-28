import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for handling requests and responses
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response ? error.response.data : error);
  }
);

// API calls
export const fetchDocuments = () => api.get('/documents');
export const fetchDocumentById = (id) => api.get(`/documents/${id}`);
export const createDocument = (data) => api.post('/documents', data);
export const updateDocument = (id, data) => api.put(`/documents/${id}`, data);
export const deleteDocument = (id) => api.delete(`/documents/${id}`);

export const fetchCommentsByDocumentId = (documentId) => api.get(`/documents/${documentId}/comments`);
export const addComment = (documentId, data) => api.post(`/documents/${documentId}/comments`, data);

export const fetchVersionsByDocumentId = (documentId) => api.get(`/documents/${documentId}/versions`);
export const fetchVersionDiff = (documentId, versionId) => api.get(`/documents/${documentId}/versions/${versionId}/diff`);