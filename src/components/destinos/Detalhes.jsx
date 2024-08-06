import React, { useEffect, useState } from 'react';

import Pagamento from '../../pages/Pagamentos';

const Detalhes = ({ destino }) => {
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [tipoEstalagem, setTipoEstalagem] = useState('padrão');
  const [participantes, setParticipantes] = useState(1);
  const [diasEstadia, setDiasEstadia] = useState(0);
  const [custoVoo, setCustoVoo] = useState(0);
  const [custoExtraDeslocamento, setCustoExtraDeslocamento] = useState(0);
  const [custoTotalEstalagem, setCustoEstalagem] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [irParaPagamento, setIrParaPagamento] = useState(false);

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
    const semanasEstadia = Math.ceil(diasEstadia / 7);
    
    const custoVoo = (distancia > 2000 ? 2 * 1500 : 1500) * participantes;
    let custoExtraDeslocamento = 0;
  
    if (distancia > 2000) {
      custoExtraDeslocamento = (distancia - 2000);
    }
    
    const custoEstalagem = tipoEstalagem === 'luxo' ? 700 : 400;
    const custoTotalEstalagem = semanasEstadia * custoEstalagem * (1 + (participantes - 1) * 0.25);
    const total = custoVoo + custoExtraDeslocamento + custoTotalEstalagem;

    setDiasEstadia(diasEstadia);
    setCustoVoo(custoVoo);
    setCustoExtraDeslocamento(custoExtraDeslocamento);
    setCustoEstalagem(custoTotalEstalagem);

    return total;
  };

  const finalizarCompra = () => {
    alert('Compra finalizada!');
    setIrParaPagamento(false);
  };

  if (irParaPagamento) {
    return <Pagamento subtotal={subtotal} finalizarCompra={finalizarCompra} />;
  }
    
    return <>
        <h2> { destino ? <p>{diasEstadia} dias de estadia em {destino.nome} para {participantes} pessoas </p> : <p>Escolha um destino</p> }</h2>
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
        <input type="number" value={participantes} onChange={(e) => setParticipantes(e.target.value || 1)} min="1" />
        </label>
        <h2><p></p></h2>
        <h2><p>Gasto com Voo: R${custoVoo}</p></h2>
        <h2><p>Gasto com Deslocamento: R${custoExtraDeslocamento}</p></h2>
        <h2><p>Gasto com Estalagem: R${custoTotalEstalagem}</p></h2>
        <h1><p>Subtotal: R${subtotal}</p></h1>
        <button
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => setIrParaPagamento(true)}>
            Comprar
        </button>
    </>;
  }

export default Detalhes;
