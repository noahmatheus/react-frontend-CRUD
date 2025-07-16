import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from "./BotaoVoltar";

function CadastrarFormularioAdicional() {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [catalogos, setCatalogos] = useState([]);
    const [catalogoSelecionado, setCatalogoSelecionado] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Buscar os catálogos na montagem do componente
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("https://renderproject-deploy.onrender.com/api/catalogo/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setCatalogos(data))
            .catch(err => console.error("Erro ao carregar catálogos:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!catalogoSelecionado) {
            alert("Selecione um catálogo antes de cadastrar.");
            return;
        }


        fetch("https://renderproject-deploy.onrender.com/api/adicional/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nome,
                valor,
                catalogo_temp: parseInt(catalogoSelecionado), // Usa o valor do select
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
                alert("Adicional cadastrado com sucesso!");
                setNome("");
                setValor("");
                setCatalogoSelecionado("");
            })
            .catch((err) => {
                alert("Erro: " + err.message);
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Cadastrar Adicional</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
                {/* Nome */}
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

                {/* Valor */}
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

                {/* Select de Catálogo */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Catálogo:</label>
                    <select
                        value={catalogoSelecionado}
                        onChange={(e) => setCatalogoSelecionado(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            marginBottom: "15px"
                        }}
                    >
                        <option value="">Selecione um catálogo</option>
                        {catalogos.map(c => (
                            <option key={c.id_catalogo} value={c.id_catalogo}>
                                {c.nome}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Botões */}
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

export default CadastrarFormularioAdicional;
