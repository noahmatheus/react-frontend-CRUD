import React, { useCallback, useEffect, useState } from "react";
import PedidosBoard from "./PedidosBoard";

function ListarPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const carregarPedidos = useCallback(async () => {
        // Se o modal estiver aberto, não atualiza automaticamente
        if (modalAberto) {
            console.log("Modal aberto - pulando atualização automática");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://renderproject-deploy.onrender.com/api/pedido/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Erro ao carregar pedidos");
            }

            const data = await res.json();
            setPedidos(data);
        } catch (err) {
            console.error("Erro ao carregar pedidos:", err);
            setErro("Erro ao carregar pedidos");
        } finally {
            setLoading(false);
        }
    }, [modalAberto]);

    useEffect(() => {
        carregarPedidos();
        const interval = setInterval(carregarPedidos, 30000);
        return () => clearInterval(interval);
    }, [carregarPedidos]);

    const handleStatusChange = async (id_pedido, novoStatus) => {
        setUpdatingId(id_pedido);
        setErro("");
        const token = localStorage.getItem("token");
        const url = `https://renderproject-deploy.onrender.com/api/pedido/${id_pedido}/status?status=${novoStatus}`;
        
        try {
            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                let msg = "Erro ao atualizar status";
                try {
                    const data = await res.json();
                    if (data && data.message) msg += ": " + data.message;
                } catch (e) {
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

    // Função para notificar quando o modal abre/fecha
    const handleModalStateChange = (isOpen) => {
        setModalAberto(isOpen);
        console.log(`Modal ${isOpen ? 'aberto' : 'fechado'} - ${isOpen ? 'pausando' : 'retomando'} atualizações`);
    };

    return (
        <div style={{ padding: 24 }}>
            <h2>Pedidos</h2>
            {erro && <div style={{ color: "red" }}>{erro}</div>}
            {loading ? (
                <div>Carregando pedidos...</div>
            ) : (
                <PedidosBoard 
                    pedidos={pedidos} 
                    onStatusChange={handleStatusChange} 
                    isUpdating={updatingId}
                    onModalStateChange={handleModalStateChange}
                />
            )}
        </div>
    );
}

export default ListarPedidos;