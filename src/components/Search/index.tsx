import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

interface Props {
    handleSearch: Function;
    searchValue: string;

}

const Index = ( { handleSearch, searchValue }: Props) => {
  return (
      <div>
        <Search
            onChange={(value) => handleSearch(value)}
            value={ searchValue }
            placeholder="search products"
            // onSearch={value => handleSearch(value)}
            style={{width: 200}}
        />
      </div>
  );
};

export default Index;