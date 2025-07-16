import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';

function EditarFormularioAdicional({ adicional, onCancel, onUpdate }) {
    const [nome, setNome] = useState(adicional.nome);
    const [valor, setValor] = useState(adicional.valor);
    const [catalogos, setCatalogos] = useState([]);
    const [catalogoSelecionado, setCatalogoSelecionado] = useState("");

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

    const handleSalvar = async () => {

        if (!catalogoSelecionado) {
            alert("Selecione um catálogo antes de cadastrar.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://renderproject-deploy.onrender.com/api/adicional/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id_adicional: adicional.id_adicional, nome, valor, catalogo_temp: parseInt(catalogoSelecionado) }),
            });

            if (res.ok) {
                alert("Adicional atualizado com sucesso!");
                onUpdate();
            } else {
                const erro = await res.json();
                alert("Erro ao atualizar: " + (erro.message || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro ao atualizar adicional:", err);
            alert("Erro de conexão.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "20px auto" }}>
            <h3 style={{ marginBottom: "20px" }}>Editando: {adicional.nome}</h3>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
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

export default EditarFormularioAdicional;
