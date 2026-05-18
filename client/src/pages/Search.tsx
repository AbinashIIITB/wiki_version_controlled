import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchSearchResults } from '../store/documents.slice';
import SearchBar from '../components/search/SearchBar';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.documents.searchResults);
    const loading = useSelector((state: RootState) => state.documents.loading);

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchResults(query));
        }
    }, [query, dispatch]);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    return (
        <div className="search-page p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Search Documents</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p className="text-slate-400 mt-2">Loading...</p>}
            <div className="search-results mt-6 space-y-4">
                {searchResults && searchResults.map((result: any) => (
                    <div key={result.id} className="result-item p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <h2 className="text-xl font-semibold text-white">{result.title}</h2>
                        <p className="text-slate-300 mt-1">{result.content ? result.content.substring(0, 150) + '...' : ''}</p>
                    </div>
                ))}
                {!loading && query && searchResults.length === 0 && (
                    <p className="text-slate-400">No documents found matching "{query}".</p>
                )}
            </div>
        </div>
    );
};

export default Search;