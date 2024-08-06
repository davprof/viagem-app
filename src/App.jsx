import React, { useState } from 'react';
import Home from './pages/Home';
import Destinos from './pages/Destinos';
import Contato from './pages/Contato';
import Header from './components/main/Header';
import Footer from './components/main/Footer';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('Home');

  const renderPagina = () => {
    switch (paginaAtual) {
      case 'Home':
      return <Home />;
      case 'Destinos':
      return <Destinos />;
      case 'Contato':
      return <Contato />;
      default:
      return <Home />;
    }
  };


  return (
    <div className="App">
      <Header />
      <nav>
        <button onClick={() => setPaginaAtual('Home')}>Home</button>
        <button onClick={() => setPaginaAtual('Destinos')}>Destinos</button>
        <button onClick={() => setPaginaAtual('Contato')}>Contato</button>
      </nav>
      {renderPagina()}
      <Footer />
    </div>
  );
}

export default App;