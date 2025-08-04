import { useState } from "react";
import UploadImagem from "./components/UploadImagem";

function EditarFormularioConfiguracao({ configuracao, onCancel, onUpdate }) {
    const [endereco, setEndereco] = useState(configuracao.endereco || "");
    const [bairro, setBairro] = useState(configuracao.bairro || "");
    const [cidade, setCidade] = useState(configuracao.cidade || "");
    const [txEntregaPadrao, setTxEntregaPadrao] = useState(configuracao.tx_entrega_padrao || 0);

    const handleSalvar = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`https://renderproject-deploy.onrender.com/api/configuracao/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id_configuracao: configuracao.id_configuracao,
                    endereco: endereco,
                    bairro: bairro,
                    cidade: cidade,
                    tx_entrega_padrao: Number(txEntregaPadrao)
                }),
            });
            if (res.ok) {
                alert("Configuração atualizada com sucesso!");
                onUpdate();
            } else {
                const erro = await res.json();
                alert("Erro ao atualizar: " + (erro.message || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro ao atualizar configuração:", err);
            alert("Erro de conexão.");
        }
    };

    const handleUploadSuccess = () => {
        // Recarregar dados da configuração após upload
        onUpdate();
    };

    return (
        <div style={{ maxWidth: 600, margin: "20px auto" }}>
            <h3 style={{ marginBottom: "20px" }}>Editando configuração</h3>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Endereço:</label>
                <input
                    type="text"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Bairro:</label>
                <input
                    type="text"
                    value={bairro}
                    onChange={e => setBairro(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Cidade:</label>
                <input
                    type="text"
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Taxa de Entrega Padrão (R$):</label>
                <input
                    type="number"
                    value={txEntregaPadrao}
                    onChange={e => setTxEntregaPadrao(e.target.value)}
                    step="0.01"
                    min="0"
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            {/* Upload de imagens */}
            <div style={{ marginBottom: "20px" }}>
                <h4 style={{ margin: "20px 0 15px 0", color: "#333" }}>Upload de Imagens</h4>
                
                <UploadImagem 
                    tipo="logo"
                    idConfiguracao={configuracao.id_configuracao}
                    onUploadSuccess={handleUploadSuccess}
                />
                
                <UploadImagem 
                    tipo="banner"
                    idConfiguracao={configuracao.id_configuracao}
                    onUploadSuccess={handleUploadSuccess}
                />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={handleSalvar}
                    style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1
                    }}
                >
                    Salvar
                </button>
                <button
                    onClick={onCancel}
                    style={{
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default EditarFormularioConfiguracao; 