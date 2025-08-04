import { useCallback, useEffect, useState } from "react";

function ModalDetalhes({ pedidoId, onClose }) {
    const [detalhes, setDetalhes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const carregarDetalhes = useCallback(async () => {
        setLoading(true);
        setErro("");
        
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://renderproject-deploy.onrender.com/api/itempedido/pedido/${pedidoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar detalhes do pedido");
            }

            const data = await response.json();
            setDetalhes(data);
        } catch (err) {
            console.error("Erro ao carregar detalhes:", err);
            setErro("Erro ao carregar detalhes do pedido");
        } finally {
            setLoading(false);
        }
    }, [pedidoId]);

    useEffect(() => {
        if (pedidoId) {
            carregarDetalhes();
        }
    }, [carregarDetalhes, pedidoId]);

    const calcularTotalGeral = () => {
        if (!detalhes) return 0;
        return detalhes.reduce((total, item) => total + item.valor_total_item, 0);
    };

    if (!pedidoId) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
        }}>
            <div style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "30px",
                maxWidth: "700px",
                width: "100%",
                maxHeight: "85vh",
                overflow: "auto",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                position: "relative"
            }}>
                {/* Botão fechar */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "15px",
                        right: "20px",
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: "#666",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        transition: "background 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f0f0f0"}
                    onMouseLeave={(e) => e.target.style.background = "none"}
                >
                    ×
                </button>

                {/* Header */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "25px",
                    paddingRight: "40px"
                }}>
                    <h2 style={{
                        color: "#333",
                        fontSize: "24px",
                        fontWeight: "600",
                        margin: "0 0 8px 0"
                    }}>
                        🍽️ Detalhes do Pedido #{pedidoId}
                    </h2>
                    <p style={{
                        color: "#666",
                        fontSize: "14px",
                        margin: "0"
                    }}>
                        Itens e adicionais do pedido
                    </p>
                </div>

                {/* Conteúdo */}
                {loading ? (
                    <div style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#666"
                    }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            border: "4px solid #f3f3f3",
                            borderTop: "4px solid #6c757d",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 20px"
                        }}></div>
                        Carregando detalhes...
                    </div>
                ) : erro ? (
                    <div style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#dc3545"
                    }}>
                        <div style={{ fontSize: "18px", marginBottom: "10px" }}>⚠️</div>
                        {erro}
                    </div>
                ) : detalhes && detalhes.length > 0 ? (
                    <div style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}>
                        {/* Lista de Itens */}
                        <div style={{ marginBottom: "25px" }}>
                            {detalhes.map((item, index) => (
                                <div key={item.id_item_pedido} style={{
                                    background: "#f8f9fa",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    marginBottom: "16px",
                                    border: "1px solid #e9ecef",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                                }}>
                                    {/* Produto Principal */}
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        marginBottom: "12px"
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                color: "#333",
                                                marginBottom: "4px"
                                            }}>
                                                {item.nome_produto}
                                            </div>
                                            <div style={{
                                                fontSize: "13px",
                                                color: "#666",
                                                marginBottom: "8px",
                                                lineHeight: "1.4"
                                            }}>
                                                {item.descricao_produto}
                                            </div>
                                            <div style={{
                                                fontSize: "14px",
                                                color: "#495057",
                                                fontWeight: "600"
                                            }}>
                                                Quantidade: {item.quantidade} × R$ {Number(item.valor_produto).toFixed(2)}
                                            </div>
                                        </div>
                                        <div style={{
                                            fontSize: "16px",
                                            fontWeight: "700",
                                            color: "#2e7d32",
                                            textAlign: "right"
                                        }}>
                                            R$ {Number(item.valor_total_item).toFixed(2)}
                                        </div>
                                    </div>

                                    {/* Adicionais */}
                                    {item.adicionais && item.adicionais.length > 0 && (
                                        <div style={{
                                            marginTop: "12px",
                                            paddingTop: "12px",
                                            borderTop: "1px solid #dee2e6"
                                        }}>
                                            <div style={{
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                color: "#6c757d",
                                                marginBottom: "8px"
                                            }}>
                                                🧀 Adicionais:
                                            </div>
                                            {item.adicionais.map((adicional, adicIndex) => (
                                                <div key={adicional.id_item_adicional} style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    padding: "6px 0",
                                                    fontSize: "13px"
                                                }}>
                                                    <div style={{ color: "#495057" }}>
                                                        {adicional.nome} (×{adicional.quantidade})
                                                    </div>
                                                    <div style={{ 
                                                        color: "#2e7d32", 
                                                        fontWeight: "600" 
                                                    }}>
                                                        R$ {Number(adicional.valor * adicional.quantidade).toFixed(2)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Total Geral */}
                        <div style={{
                            background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
                            color: "white",
                            padding: "20px",
                            borderRadius: "12px",
                            textAlign: "center",
                            marginBottom: "25px"
                        }}>
                            <div style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                marginBottom: "4px"
                            }}>
                                Total do Pedido
                            </div>
                            <div style={{
                                fontSize: "24px",
                                fontWeight: "700"
                            }}>
                                R$ {Number(calcularTotalGeral()).toFixed(2)}
                            </div>
                        </div>
                        
                        {/* Botão Fechar */}
                        <div style={{
                            textAlign: "center"
                        }}>
                            <button
                                onClick={onClose}
                                style={{
                                    background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
                                    color: "white",
                                    padding: "12px 24px",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 4px 12px rgba(108, 117, 125, 0.3)"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow = "0 6px 16px rgba(108, 117, 125, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow = "0 4px 12px rgba(108, 117, 125, 0.3)";
                                }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#666"
                    }}>
                        <div style={{ fontSize: "18px", marginBottom: "10px" }}>📋</div>
                        Nenhum item encontrado para este pedido.
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default ModalDetalhes; 