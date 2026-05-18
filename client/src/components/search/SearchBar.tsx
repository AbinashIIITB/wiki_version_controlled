import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search documents..."
                className="w-full px-4 py-2 rounded-l-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-r-xl px-6 py-2 transition">
                Search
            </button>
        </form>
    );
};

export default SearchBar;