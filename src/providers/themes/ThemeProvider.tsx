import React from 'react';
import { themes } from './Themes';

import ThemeContext from './ThemeContext';

const ThemeProvider = (props: any) => {
    return (
        <ThemeContext.Provider
            value={{
                themes,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
