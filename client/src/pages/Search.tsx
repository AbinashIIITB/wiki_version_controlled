import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../store/documents.slice';
import SearchBar from '../components/search/SearchBar';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.documents.searchResults);
    const loading = useSelector((state) => state.documents.loading);

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchResults(query));
        }
    }, [query, dispatch]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
    };

    return (
        <div className="search-page">
            <h1 className="text-2xl font-bold mb-4">Search Documents</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            <div className="search-results">
                {searchResults.map((result) => (
                    <div key={result.id} className="result-item">
                        <h2 className="text-xl">{result.title}</h2>
                        <p>{result.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;