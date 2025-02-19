import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
