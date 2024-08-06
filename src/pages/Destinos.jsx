import React, { useState } from 'react';

import FormDestino from '../components/destinos/FormDestino';
import Destino from '../components/destinos/Destino';

const Destinos = () => {
    const [destinos, setDestinos] = useState([
      { nome: 'Paris', descricao: 'A cidade do amor.' },
      { nome: 'Nova York', descricao: 'A cidade que nunca dorme.' },
      { nome: 'Tóquio', descricao: 'A capital do Japão.' }
    ]);
  
    const adicionarDestino = (novoDestino) => {
      setDestinos([...destinos, novoDestino]);
    };
    
    return <>
        <FormDestino adicionarDestino={adicionarDestino} />
            {destinos.map((destino, index) => (
              <Destino key={index} nome={destino.nome} descricao={destino.descricao} />
            ))}
    </>;
  }

export default Destinos;
