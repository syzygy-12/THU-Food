import React, { useState } from 'react';

interface SearchBarProps {
    width: string;
    height: string;
    backgroundColor: string;
    handleNavigation: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ width, height, backgroundColor, handleNavigation }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleNavigation(`/search/${inputValue}`);
        }
    };

    return (
        <div style={{ width, height, backgroundColor, display: 'flex', alignItems: 'center', padding: 0, borderRadius: '4px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="搜索"
                style={{  backgroundColor: 'transparent', width: '100%', height: '100%', border: 'none', outline: 'none', padding: '16px'}}
            />
        </div>
    );
};

export default SearchBar;
