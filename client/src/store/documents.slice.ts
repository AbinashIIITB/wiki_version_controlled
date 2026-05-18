import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchDocuments as apiFetchDocuments, 
    createDocument as apiCreateDocument, 
    updateDocument as apiUpdateDocument, 
    deleteDocument as apiDeleteDocument,
    searchDocuments as apiSearchDocuments
} from '../services/api';

export interface Document {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt?: string;
    updatedAt?: string;
}

interface DocumentsState {
    documents: Document[];
    searchResults: Document[];
    loading: boolean;
    error: string | null;
}

const initialState: DocumentsState = {
    documents: [],
    searchResults: [],
    loading: false,
    error: null,
};

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
    const data = await apiFetchDocuments();
    return data as any as Document[];
});

export const createDocument = createAsyncThunk('documents/createDocument', async (document: { title: string; content: string }) => {
    const data = await apiCreateDocument(document);
    return data as any as Document;
});

export const updateDocument = createAsyncThunk('documents/updateDocument', async ({ id, document }: { id: number | string; document: { title?: string; content?: string } }) => {
    const data = await apiUpdateDocument(id, document);
    return data as any as Document;
});

export const deleteDocument = createAsyncThunk('documents/deleteDocument', async (id: number | string) => {
    await apiDeleteDocument(id);
    return id;
});

export const fetchSearchResults = createAsyncThunk('documents/fetchSearchResults', async (query: string) => {
    const data = await apiSearchDocuments(query);
    return data as any as Document[];
});

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
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
                state.error = action.error.message || 'Failed to fetch documents';
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
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch search results';
            });
    },
});

export default documentsSlice.reducer;