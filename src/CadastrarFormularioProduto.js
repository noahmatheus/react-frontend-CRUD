import { useState } from "react";
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from "./BotaoVoltar";

function CadastrarFormularioProduto() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    // const [catalogo_temp, setValor] = useState(produto.valor);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://renderproject-deploy.onrender.com/api/produtos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nome,
                descricao,
                valor,
                catalogo_temp: 1,
                // fix arrumar depois
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
                alert("Produto cadastrada com sucesso!");
                setNome("");
                setDescricao("");
                setValor("");
            })
            .catch((err) => {
                alert("Erro: " + err.message);
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Cadastrar Produto</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Descrição:</label>
                    <input
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Valor:</label>

                    <NumericFormat
                        value={valor}
                        onValueChange={(values) => {
                            setValor(values.value); // `values.value` = valor numérico puro, sem formatação
                        }}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        customInput={(inputProps) => (
                            <input
                                {...inputProps}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        )}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    <button
                        type="submit"
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
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        onClick={() => { navigate(-1); }}
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
            </form>

            <BotaoVoltar />
        </div>
    );
}

export default CadastrarFormularioProduto;
