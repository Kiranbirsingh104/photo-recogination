import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
