import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AppRouter from './Components/AppRouter';
import { ProvideAuth } from './hooks/useProvideAuth';

function App() {
  return (
    <ProvideAuth>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </ProvideAuth>
  );
}

export default App;
