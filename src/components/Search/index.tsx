import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

interface Props {
    handleSearch: handleSearch;
    searchValue: string;
}

// use type tp declare a function type
type handleSearch = (value: any) => void;

const Index = ({ handleSearch, searchValue }: Props) => {
    return (
        <div>
            <Search
                onChange={(value) => handleSearch(value)}
                value={searchValue}
                placeholder="search products"
                style={{ width: 200 }}
            />
        </div>
    );
};

export default Index;
