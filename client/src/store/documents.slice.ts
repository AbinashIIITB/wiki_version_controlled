import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
    const response = await api.get('/documents');
    return response.data;
});

export const createDocument = createAsyncThunk('documents/createDocument', async (document) => {
    const response = await api.post('/documents', document);
    return response.data;
});

export const updateDocument = createAsyncThunk('documents/updateDocument', async ({ id, document }) => {
    const response = await api.put(`/documents/${id}`, document);
    return response.data;
});

export const deleteDocument = createAsyncThunk('documents/deleteDocument', async (id) => {
    await api.delete(`/documents/${id}`);
    return id;
});

const documentsSlice = createSlice({
    name: 'documents',
    initialState: {
        documents: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocuments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDocuments.fulfilled, (state, action) => {
                state.loading = false;
                state.documents = action.payload;
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createDocument.fulfilled, (state, action) => {
                state.documents.push(action.payload);
            })
            .addCase(updateDocument.fulfilled, (state, action) => {
                const index = state.documents.findIndex(doc => doc.id === action.payload.id);
                if (index !== -1) {
                    state.documents[index] = action.payload;
                }
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.documents = state.documents.filter(doc => doc.id !== action.payload);
            });
    },
});

export default documentsSlice.reducer;