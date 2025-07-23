import React, { useState } from "react";

const STATUS_OPTIONS = [
  "NOVO",
  "EM_PREPARO",
  "PRONTO",
  "FINALIZADO",
  "CANCELADO"
];

const STATUS_COLORS = {
  NOVO:    "#e3f2fd", // azul claro
  EM_PREPARO: "#fff9c4", // amarelo claro
  PRONTO:  "#c8e6c9", // verde claro
  FINALIZADO: "#eeeeee", // cinza claro
  CANCELADO:  "#ffcdd2"  // vermelho claro
};

function PedidoCard({ pedido, onStatusChange, isUpdating, editable = true }) {
  const [status, setStatus] = useState(pedido.status);

  const handleChange = async (e) => {
    const novoStatus = e.target.value;
    setStatus(novoStatus);
    if (novoStatus !== pedido.status && onStatusChange) {
      onStatusChange(pedido.id_pedido, novoStatus);
    }
  };

  return (
    <div style={{
      background: STATUS_COLORS[status] || "#fff",
      borderRadius: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      margin: "10px 0",
      padding: 18,
      minWidth: 260,
      maxWidth: 320,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
      <div style={{ fontWeight: 600, fontSize: 18 }}>#{pedido.id_pedido} - {pedido.nome || <span style={{color:'#aaa'}}>Sem nome</span>}</div>
      <div><b>Telefone:</b> {pedido.telefone || <span style={{color:'#aaa'}}>Não informado</span>}</div>
      <div><b>Endereço:</b> {pedido.endereco || <span style={{color:'#aaa'}}>Não informado</span>} {pedido.bairro && `- ${pedido.bairro}`}</div>
      {pedido.referencia && <div><b>Referência:</b> {pedido.referencia}</div>}
      <div><b>Aba:</b> {pedido.aba}</div>
      <div><b>Pagamento:</b> {pedido.pagamento}</div>
      {pedido.troco !== null && pedido.troco !== undefined && <div><b>Troco:</b> R$ {Number(pedido.troco).toFixed(2)}</div>}
      <div><b>Total:</b> <span style={{color:'#007bff'}}>R$ {Number(pedido.total).toFixed(2)}</span></div>
      <div><b>Data/Hora:</b> {new Date(pedido.data_hora).toLocaleString()}</div>
      <div style={{marginTop:8}}>
        <b>Status:</b>{' '}
        <select
          value={status}
          onChange={handleChange}
          disabled={isUpdating || !editable}
          style={{padding:4, borderRadius:4, background: editable ? undefined : '#eee', color: editable ? undefined : '#888'}}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt.replace('_',' ')}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PedidoCard; 