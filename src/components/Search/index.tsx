import React from 'react';

import { Input } from 'antd';

const { Search } = Input;

const Index = () => {
  return (
      <div>
        <Search
            placeholder="search products"
            onSearch={value => console.log(value)}
            style={{width: 200}}
        />
      </div>
  );
};

export default Index;
