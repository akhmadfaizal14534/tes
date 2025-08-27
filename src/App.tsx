import React, { useState } from 'react';
import DiagramGenerator from './components/DiagramGenerator';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <DiagramGenerator />
    </div>
  );
}

export default App;