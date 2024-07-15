import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import ProdutoListar from './components/pages/livro/livro-listar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);
