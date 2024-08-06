import React, { useEffect, useState } from 'react';

const Detalhes = ({ destino }) => {
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [tipoEstalagem, setTipoEstalagem] = useState('padrão');
  const [participantes, setParticipantes] = useState(1);
  const [subtotal, setSubtotal] = useState(0);  

  useEffect(() => {
    if (destino && dataIda && dataVolta) {
      const custo = calcularCustos(destino.distancia, dataIda, dataVolta, tipoEstalagem, participantes);
      setSubtotal(custo);
    }
  }, [destino, dataIda, dataVolta, tipoEstalagem, participantes]);
  
  const calcularCustos = (distancia, dataIda, dataVolta, tipoEstalagem, participantes) => {
    const hoje = new Date();
    const ida = new Date(dataIda);
    const volta = new Date(dataVolta);
    const diasEstadia = (volta - ida) / (1000 * 60 * 60 * 24);
    console.log(diasEstadia);
    const semanasEstadia = Math.ceil(diasEstadia / 7);
    
    let custoVoo = distancia > 2000 ? 2 * 1500 : 1500;
  
    if (distancia > 2000) {
      custoVoo += (distancia - 2000);
    }

    console.log(`custo voo ${custoVoo}`);
    
    const custoEstalagem = tipoEstalagem === 'luxo' ? 700 : 400;
    const custoTotalEstalagem = semanasEstadia * custoEstalagem * (1 + (participantes - 1) * 0.25);
    
    console.log(`semanas de estadia ${semanasEstadia}`);

    console.log(`custo estalagem ${custoTotalEstalagem}`);

    const total = custoVoo + custoTotalEstalagem;

    console.log(`custo total ${total}`);

    return total;
  };
    
    return <>
        <h2> { destino ? <p>Viagem para: {destino.nome}</p> : <p>Escolha um destino</p> }</h2>
        <label>Data de Ida:
        <input type="date" value={dataIda} onChange={(e) => setDataIda(e.target.value)} />
        </label>
        <label>Data de Volta:
        <input type="date" value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} />
        </label>
        <label>Tipo de Estalagem:
        <select value={tipoEstalagem} onChange={(e) => setTipoEstalagem(e.target.value)}>
            <option value="padrão">Padrão</option>
            <option value="luxo">Luxo</option>
        </select>
        </label>
        <label>Número de Participantes:
        <input type="number" value={participantes} onChange={(e) => setParticipantes(e.target.value)} min="1" />
        </label>
        <h1><p>Subtotal: R${subtotal}</p></h1>
    </>;
  }

export default Detalhes;
