//create theme context

import { createContext } from 'react';
import { ThemesType } from './ThemeTypes';

export default createContext<ThemesType | any>(null);
