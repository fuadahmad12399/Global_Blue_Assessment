import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculator from './components/Calculator';
import CurrencyGrid from './components/Currency';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/currency" element={<CurrencyGrid />} />
    </Routes>
  );
}

export default App;