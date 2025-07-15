import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import CadastrarFormularioCatalogo from "../CadastrarFormularioCatalogo";
import EditarFormularioCatalogo from "../EditarFormularioCatalogo";
import ExcluirFormularioCatalogo from "../ExcluirFormularioCatalogo";

function EditarCatalogo() {
    const [catalogo, setCatalogo] = useState([]);
    const [filtroNome, setFiltroNome] = useState(""); // estado para o filtro
    const [catalogoSelecionado, setCatalogoSelecionado] = useState(null);
    const [modo, setModo] = useState(null); // "editar" ou "excluir"
    const [erro, setErro] = useState("");

    const carregarCatalogo = useCallback(() => {
        const token = localStorage.getItem("token");

        fetch("https://renderproject-deploy.onrender.com/api/catalogo/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar catalogo");
                }
                return res.json();
            })
            .then(data => setCatalogo(data))
            .catch(() => setErro("Erro ao carregar catalogo"));
    }, []);

    useEffect(() => {
        carregarCatalogo();
    }, [carregarCatalogo]);

    const selecionarParaEditar = (catalogo) => {
        setCatalogoSelecionado(catalogo);
        setModo("editar");
    };

    const selecionarParaExcluir = (catalogo) => {
        setCatalogoSelecionado(catalogo);
        setModo("excluir");
    };

    // novo
    const iniciarCadastro = () => {
        setCatalogoSelecionado(null);
        setModo("cadastrar");
    };

    const cancelar = () => {
        setCatalogoSelecionado(null);
        setModo(null);
    };

    // Lista filtrada pela string do filtro (ignora case)
    const catalogosFiltrados = catalogo.filter(catalogo =>
        catalogo.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar/Excluir/Cadastrar Catalogo</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {!modo ? (
                <>
                    {/* Botão cadastrar */}
                    <button
                        onClick={iniciarCadastro}
                        style={{
                            marginBottom: "15px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        Cadastrar novo catalogo
                    </button>

                    {/* Campo filtro */}
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="filtroNome" style={{ marginRight: "8px" }}>Filtrar por nome catalogo:</label>
                        <input
                            id="filtroNome"
                            type="text"
                            value={filtroNome}
                            onChange={e => setFiltroNome(e.target.value)}
                            placeholder="Digite um nome para buscar"
                            style={{
                                padding: "6px 10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "250px",
                                maxWidth: "100%",
                            }}
                        />
                    </div>

                    <table
                        border="1"
                        cellPadding="5"
                        style={{ marginTop: "10px", borderCollapse: "collapse", width: "100%" }}
                    >
                        <thead style={{ backgroundColor: "#f2f2f2" }}>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogosFiltrados.map(catalogo => (
                                <tr key={catalogo.id_catalogo}>
                                    <td>{catalogo.id_catalogo}</td>
                                    <td>{catalogo.nome}</td>
                                    <td>
                                        <button
                                            onClick={() => selecionarParaEditar(catalogo)}
                                            style={{
                                                backgroundColor: "#007bff",
                                                color: "#fff",
                                                padding: "6px 12px",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                marginRight: "8px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => selecionarParaExcluir(catalogo)}
                                            style={{
                                                backgroundColor: "#dc3545",
                                                color: "#fff",
                                                padding: "6px 12px",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {catalogosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                                        Nenhum catalogo encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : modo === "editar" ? (
                <EditarFormularioCatalogo
                    catalogo={catalogoSelecionado}
                    onCancel={cancelar}
                    onUpdate={() => {
                        carregarCatalogo();
                        cancelar();
                    }}
                />
            ) : modo === "cadastrar" ? (
                <CadastrarFormularioCatalogo
                    catalogo={null}
                    onCancel={cancelar}
                    onCreate={() => {
                        carregarCatalogo();
                        cancelar();
                    }}
                />
            ) : (
                <ExcluirFormularioCatalogo
                    catalogo={catalogoSelecionado}
                    onCancel={cancelar}
                    onExclusaoSucesso={() => {
                        carregarCatalogo();
                        cancelar();
                    }}
                />
            )}

            <BotaoVoltar />
        </div>
    );

}

export default EditarCatalogo;