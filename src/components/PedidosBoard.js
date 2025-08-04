import React, { useMemo, useState } from "react";
import PedidoCard from "./PedidoCard";

const COLUMNS = [
    { key: "NOVO_EM_PREPARO", label: "Novo / Em Preparo", status: ["NOVO", "EM_PREPARO"] },
    { key: "PRONTO", label: "Pronto", status: ["PRONTO"] },
    { key: "FINALIZADO_CANCELADO", label: "Finalizado / Cancelado", status: ["FINALIZADO", "CANCELADO"] }
];

const PAGE_SIZE = 8;

function PedidosBoard({ pedidos, onStatusChange, isUpdating, onModalStateChange }) {
    const [pages, setPages] = useState(COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: 1 }), {}));

    const pedidosPorColuna = useMemo(() => {
        const resultado = {};
        COLUMNS.forEach(col => {
            resultado[col.key] = pedidos.filter(pedido => col.status.includes(pedido.status));
        });
        return resultado;
    }, [pedidos]);

    const handlePageChange = (colKey, direction) => {
        setPages(prev => ({
            ...prev,
            [colKey]: Math.max(1, Math.min(
                prev[colKey] + direction,
                Math.ceil(pedidosPorColuna[colKey].length / PAGE_SIZE)
            ))
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
                    <div key={col.key} style={{
                        minWidth: 320,
                        background: "#ffffff",
                        borderRadius: 12,
                        padding: 20,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #e9ecef"
                    }}>
                        <h3 style={{
                            margin: "0 0 16px 0",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#333",
                            textAlign: "center"
                        }}>
                            {col.label}
                        </h3>

                        {paginated.length === 0 ? (
                            <div style={{
                                textAlign: "center",
                                color: "#666",
                                padding: "40px 20px",
                                fontSize: "14px"
                            }}>
                                Nenhum pedido
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                {paginated.map(pedido => (
                                    <PedidoCard
                                        key={pedido.id_pedido}
                                        pedido={pedido}
                                        onStatusChange={onStatusChange}
                                        isUpdating={isUpdating === pedido.id_pedido}
                                        onModalStateChange={onModalStateChange}
                                    />
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 12,
                                marginTop: 16,
                                paddingTop: 16,
                                borderTop: "1px solid #e9ecef"
                            }}>
                                <button
                                    onClick={() => handlePageChange(col.key, -1)}
                                    disabled={page === 1}
                                    style={{
                                        padding: "6px 12px",
                                        border: "none",
                                        borderRadius: "6px",
                                        background: page === 1 ? "#f8f9fa" : "#6c757d",
                                        color: page === 1 ? "#adb5bd" : "#ffffff",
                                        cursor: page === 1 ? "not-allowed" : "pointer",
                                        fontSize: "12px",
                                        fontWeight: "600"
                                    }}
                                >
                                    ← Anterior
                                </button>
                                
                                <span style={{
                                    fontSize: "14px",
                                    color: "#495057",
                                    fontWeight: "600"
                                }}>
                                    {page} de {totalPages}
                                </span>
                                
                                <button
                                    onClick={() => handlePageChange(col.key, 1)}
                                    disabled={page === totalPages}
                                    style={{
                                        padding: "6px 12px",
                                        border: "none",
                                        borderRadius: "6px",
                                        background: page === totalPages ? "#f8f9fa" : "#6c757d",
                                        color: page === totalPages ? "#adb5bd" : "#ffffff",
                                        cursor: page === totalPages ? "not-allowed" : "pointer",
                                        fontSize: "12px",
                                        fontWeight: "600"
                                    }}
                                >
                                    Próxima →
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default PedidosBoard; 