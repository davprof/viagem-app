import React from 'react';

const Pagamento = ({ subtotal, finalizarCompra }) => {
  return (
    <div>
      <h2>Pagamento</h2>
      <p>Total: R${subtotal}</p>
      <button onClick={finalizarCompra}>Finalizar Compra com PIX</button>
      <button onClick={finalizarCompra}>Finalizar Compra com Cartão de Crédito</button>
    </div>
  );
};

export default Pagamento;