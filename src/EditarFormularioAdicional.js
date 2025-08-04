import { useEffect, useState } from "react";

function EditarFormularioAdicional({ adicional, onCancel, onUpdate }) {
    const [nome, setNome] = useState(adicional.nome);
    const [valor, setValor] = useState(adicional.valor);
    const [catalogos, setCatalogos] = useState([]);
    const [catalogoSelecionado, setCatalogoSelecionado] = useState(adicional.catalogo_temp ? adicional.catalogo_temp.toString() : "");
    const [exibir, setExibir] = useState(adicional.exibir || false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("https://renderproject-deploy.onrender.com/api/catalogo/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCatalogos(data);
                // Se não há catálogo selecionado mas o adicional tem um, seleciona automaticamente
                if (!catalogoSelecionado && adicional.catalogo_temp) {
                    setCatalogoSelecionado(adicional.catalogo_temp.toString());
                }
            })
            .catch(err => console.error("Erro ao carregar catálogos:", err));
    }, [adicional.catalogo_temp, catalogoSelecionado]);

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
                body: JSON.stringify({
                    id_adicional: adicional.id_adicional,
                    nome: nome,
                    valor: Number(valor),
                    catalogo_temp: parseInt(catalogoSelecionado),
                    exibir: exibir
                }),
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
                <input
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
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

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Catálogo:</label>
                <select
                    value={catalogoSelecionado}
                    onChange={(e) => setCatalogoSelecionado(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                >
                    <option value="">Selecione um catálogo</option>
                    {catalogos.map(catalogo => (
                        <option key={catalogo.id_catalogo} value={catalogo.id_catalogo}>
                            {catalogo.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "10px" }}>Exibir:</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                        onClick={() => setExibir(!exibir)}
                        style={{
                            width: "50px",
                            height: "25px",
                            borderRadius: "25px",
                            border: "none",
                            background: exibir ? "#007bff" : "#ccc",
                            cursor: "pointer",
                            position: "relative",
                            transition: "background 0.3s"
                        }}
                    >
                        <div style={{
                            width: "21px",
                            height: "21px",
                            borderRadius: "50%",
                            background: "white",
                            position: "absolute",
                            top: "2px",
                            left: exibir ? "27px" : "2px",
                            transition: "left 0.3s"
                        }} />
                    </button>
                    <span style={{ fontSize: "14px", color: exibir ? "#007bff" : "#666" }}>
                        {exibir ? "Ativo" : "Inativo"}
                    </span>
                </div>
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
