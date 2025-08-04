import { useState } from "react";
import ModalDetalhes from "./ModalDetalhes";

const STATUS_OPTIONS = ["NOVO", "EM_PREPARO", "PRONTO", "FINALIZADO", "CANCELADO"];
const STATUS_COLORS = {
  "NOVO": "#e3f2fd",
  "EM_PREPARO": "#fff3e0",
  "PRONTO": "#e8f5e8",
  "FINALIZADO": "#f3e5f5",
  "CANCELADO": "#ffebee"
};

function PedidoCard({ pedido, onStatusChange, isUpdating, onModalStateChange }) {
  const [status, setStatus] = useState(pedido.status);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const handleChange = async (e) => {
    const novoStatus = e.target.value;
    setStatus(novoStatus);
    await onStatusChange(pedido.id_pedido, novoStatus);
  };

  const handleAbrirModal = () => {
    setMostrarDetalhes(true);
    if (onModalStateChange) {
      onModalStateChange(true);
    }
  };

  const handleFecharModal = () => {
    setMostrarDetalhes(false);
    if (onModalStateChange) {
      onModalStateChange(false);
    }
  };

  return (
    <>
      <div style={{
        background: STATUS_COLORS[status] || "#ffffff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        border: "1.5px solid #dee2e6",
        margin: "14px 0",
        padding: 20,
        minWidth: 260,
        maxWidth: 340,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
        transition: "all 0.3s ease"
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>ID:</b> {pedido.id_pedido}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Nome:</b> {pedido.nome}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Telefone:</b> {pedido.telefone}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Aba:</b> {pedido.aba}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Endereço:</b> {pedido.endereco}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Bairro:</b> {pedido.bairro}
        </div>
        {pedido.referencia && (
          <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
            <b>Referência:</b> {pedido.referencia}
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Pagamento:</b> {pedido.pagamento}
        </div>
        {pedido.troco && (
          <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
            <b>Troco:</b> R$ {Number(pedido.troco).toFixed(2)}
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Total:</b> <span style={{ color: '#2e7d32', fontWeight: 700 }}>R$ {Number(pedido.total).toFixed(2)}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 0 0" }}>
          <b>Data/Hora:</b> {new Date(pedido.data_hora).toLocaleString('pt-BR')}
        </div>
        
        {/* Botões de ação */}
        <div style={{ 
          marginTop: 12, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 8 
        }}>
          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <b style={{ fontSize: 14 }}>Status:</b>
            <select
              value={status}
              onChange={handleChange}
              disabled={isUpdating}
              style={{
                padding: 8,
                borderRadius: 6,
                background: "#ffffff",
                color: "#495057",
                fontWeight: 600,
                fontSize: 14,
                border: '1px solid #ced4da',
                minWidth: 110,
                cursor: "pointer",
                flex: 1
              }}
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          {/* Botão Ver Detalhes */}
          <button
            onClick={handleAbrirModal}
            style={{
              background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
              color: "white",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(108, 117, 125, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(108, 117, 125, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(108, 117, 125, 0.3)";
            }}
          >
            🔍 Ver Detalhes
          </button>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {mostrarDetalhes && (
        <ModalDetalhes
          pedidoId={pedido.id_pedido}
          onClose={handleFecharModal}
        />
      )}
    </>
  );
}

export default PedidoCard; 