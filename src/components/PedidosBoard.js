import React, { useMemo, useState } from "react";
import PedidoCard from "./PedidoCard";

const COLUMNS = [
    { key: "NOVO_EM_PREPARO", label: "Novo / Em Preparo", status: ["NOVO", "EM_PREPARO"], editable: true },
    { key: "PRONTO", label: "Pronto", status: ["PRONTO"], editable: false },
    { key: "FINALIZADO_CANCELADO", label: "Finalizado / Cancelado", status: ["FINALIZADO", "CANCELADO"], editable: false }
];

const PAGE_SIZE = 8;

function PedidosBoard({ pedidos, onStatusChange, isUpdating }) {
    // Paginação por coluna
    const [pages, setPages] = useState(
        COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: 1 }), {})
    );

    const pedidosPorColuna = useMemo(() => {
        const map = {};
        COLUMNS.forEach(col => {
            map[col.key] = pedidos.filter(p => col.status.includes(p.status));
        });
        return map;
    }, [pedidos]);

    const handlePageChange = (colKey, dir) => {
        setPages(prev => ({
            ...prev,
            [colKey]: Math.max(1, prev[colKey] + dir)
        }));
    };

    return (
        <div style={{ display: "flex", gap: 24, overflowX: "auto", padding: 16 }}>
            {COLUMNS.map(col => {
                const pedidosCol = pedidosPorColuna[col.key];
                const page = pages[col.key];
                const totalPages = Math.ceil(pedidosCol.length / PAGE_SIZE) || 1;
                const paginated = pedidosCol.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
                return (
                    <div key={col.key} style={{ minWidth: 340, flex: 1, background: "#f7f7f7", borderRadius: 10, padding: 12, boxShadow: "0 1px 4px #0001" }}>
                        <h3 style={{ textAlign: "center", margin: 0, marginBottom: 12 }}>{col.label}</h3>
                        {paginated.length === 0 ? (
                            <div style={{ color: "#aaa", textAlign: "center", marginTop: 32 }}>Nenhum pedido</div>
                        ) : (
                            paginated.map(pedido => (
                                <PedidoCard
                                    key={pedido.id_pedido}
                                    pedido={pedido}
                                    onStatusChange={col.editable ? onStatusChange : undefined}
                                    isUpdating={isUpdating === pedido.id_pedido && col.editable}
                                    editable={col.editable}
                                />
                            ))
                        )}
                        {/* Paginação */}
                        {totalPages > 1 && (
                            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                                <button onClick={() => handlePageChange(col.key, -1)} disabled={page === 1}>Anterior</button>
                                <span>Página {page} de {totalPages}</span>
                                <button onClick={() => handlePageChange(col.key, 1)} disabled={page === totalPages}>Próxima</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default PedidosBoard; 