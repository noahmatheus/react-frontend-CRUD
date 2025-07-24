import React, { useState } from "react";

const STATUS_OPTIONS = [
  "NOVO",
  "EM_PREPARO",
  "PRONTO",
  "FINALIZADO",
  "CANCELADO"
];

const STATUS_COLORS = {
  NOVO: "#e3f2fd", // azul claro
  EM_PREPARO: "#fff9c4", // amarelo claro
  PRONTO: "#c8e6c9", // verde claro
  FINALIZADO: "#eeeeee", // cinza claro
  CANCELADO: "#ffcdd2"  // vermelho claro
};

function PedidoCard({ pedido, onStatusChange, isUpdating }) {
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
      borderRadius: 12,
      boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
      border: "1.5px solid #d1d5db",
      margin: "14px 0",
      padding: 20,
      minWidth: 260,
      maxWidth: 340,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 2 }}>#{pedido.id_pedido} - {pedido.nome || <span style={{ color: '#aaa' }}>Sem nome</span>}</div>
      <div style={{ fontSize: 14, color: '#444' }}><b>Telefone:</b> {pedido.telefone || <span style={{ color: '#aaa' }}>Não informado</span>}</div>
      <div style={{ fontSize: 14, color: '#444' }}><b>Endereço:</b> {pedido.endereco || <span style={{ color: '#aaa' }}>Não informado</span>} {pedido.bairro && `- ${pedido.bairro}`}</div>
      {pedido.referencia && <div style={{ fontSize: 14, color: '#444' }}><b>Referência:</b> {pedido.referencia}</div>}
      <div style={{ fontSize: 14, color: '#444' }}><b>Aba:</b> {pedido.aba}</div>
      <div style={{ fontSize: 14, color: '#444' }}><b>Pagamento:</b> {pedido.pagamento}</div>
      {pedido.troco !== null && pedido.troco !== undefined && <div style={{ fontSize: 14, color: '#444' }}><b>Troco:</b> R$ {Number(pedido.troco).toFixed(2)}</div>}
      <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}><b>Total:</b> <span style={{ color: '#2e7d32', fontWeight: 700 }}>R$ {Number(pedido.total).toFixed(2)}</span></div>
      <div style={{ fontSize: 13, color: '#666' }}><b>Data/Hora:</b> {new Date(pedido.data_hora).toLocaleString()}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <b style={{ fontSize: 14 }}>Status:</b>
        <select
          value={status}
          onChange={handleChange}
          disabled={isUpdating}
          style={{
            padding: 5,
            borderRadius: 5,
            background: undefined,
            color: undefined,
            fontWeight: 600,
            fontSize: 14,
            border: '1px solid #bbb',
            minWidth: 110
          }}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PedidoCard; 