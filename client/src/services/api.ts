import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for handling requests and responses
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error.response ? error.response.data : error);
  }
);

// API calls
export const fetchDocuments = () => api.get('/documents');
export const fetchDocumentById = (id: number | string) => api.get(`/documents/${id}`);
export const createDocument = (data: any) => api.post('/documents', data);
export const updateDocument = (id: number | string, data: any) => api.put(`/documents/${id}`, data);
export const deleteDocument = (id: number | string) => api.delete(`/documents/${id}`);

export const fetchCommentsByDocumentId = (documentId: number | string) => api.get(`/documents/${documentId}/comments`);
export const addComment = (documentId: number | string, data: any) => api.post(`/documents/${documentId}/comments`, data);

export const fetchVersionsByDocumentId = (documentId: number | string) => api.get(`/documents/${documentId}/versions`);
export const fetchVersionDiff = (documentId: number | string, versionId: number | string) => api.get(`/documents/${documentId}/versions/${versionId}/diff`);

export const getCurrentUser = () => api.get('/auth/current');
export const searchDocuments = (query: string) => api.get(`/search/documents?query=${query}`);

export { fetchDocumentById as fetchDocument, fetchVersionsByDocumentId as fetchDocumentVersions };

export default api;