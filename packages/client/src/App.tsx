import React from 'react';
import { NavList } from './components/NavList';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent">
        <NavList />
      </div>
    </ThemeProvider>
  );
}

export default App;
