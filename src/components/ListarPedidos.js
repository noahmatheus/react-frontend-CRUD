import React, { useEffect, useState } from "react";
import PedidosBoard from "./PedidosBoard";

function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const carregarPedidos = async () => {
    setLoading(true);
    setErro("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://renderproject-deploy.onrender.com/api/pedido/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Erro ao carregar pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      setErro("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 10000); // Atualiza a cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id_pedido, novoStatus) => {
    setUpdatingId(id_pedido);
    setErro("");
    const token = localStorage.getItem("token");
    const url = `https://renderproject-deploy.onrender.com/api/pedido/${id_pedido}/status?status=${novoStatus}`;
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        let msg = "Erro ao atualizar status";
        try {
          const data = await res.json();
          if (data && data.message) msg += ": " + data.message;
        } catch (e) {
          // resposta não era json
          const text = await res.text();
          if (text) msg += ": " + text;
        }
        throw new Error(msg);
      }
      await carregarPedidos();
    } catch (err) {
      setErro(err.message || "Erro ao atualizar status do pedido");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Pedidos</h2>
      {erro && <div style={{ color: "red", textAlign: "center", marginBottom: 16 }}>{erro}</div>}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>Carregando pedidos...</div>
      ) : (
        <PedidosBoard pedidos={pedidos} onStatusChange={handleStatusChange} isUpdating={updatingId} />
      )}
    </div>
  );
}

export default ListarPedidos;