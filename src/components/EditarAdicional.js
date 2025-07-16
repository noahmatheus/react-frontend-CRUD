import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import CadastrarFormularioAdicional from "../CadastrarFormularioAdicional";
import EditarFormularioAdicional from "../EditarFormularioAdicional";
import ExcluirFormularioAdicional from "../ExcluirFormularioAdicional";

function EditarAdicional() {
    const [adicional, setAdicional] = useState([]);
    const [filtroNome, setFiltroNome] = useState(""); // estado para o filtro
    const [filtroCatalogo, setFiltroCatalogo] = useState("");
    const [catalogos, setCatalogos] = useState([]);

    const [adicionalSelecionado, setAdicionalSelecionado] = useState(null);
    const [modo, setModo] = useState(null); // "editar" ou "excluir"
    const [erro, setErro] = useState("");

    const carregarAdicional = useCallback(() => {
        const token = localStorage.getItem("token");

        fetch("https://renderproject-deploy.onrender.com/api/adicional/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar adicional");
                }
                return res.json();
            })
            .then(data => setAdicional(data))
            .catch(() => setErro("Erro ao carregar adicional"));
    }, []);

    useEffect(() => {
        carregarAdicional();

        const token = localStorage.getItem("token");
        fetch("https://renderproject-deploy.onrender.com/api/catalogo/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar catálogos");
                return res.json();
            })
            .then(data => setCatalogos(data))
            .catch(() => setErro("Erro ao carregar catálogos"));
    }, [carregarAdicional]);

    const selecionarParaEditar = (adicional) => {
        setAdicionalSelecionado(adicional);
        setModo("editar");
    };

    const selecionarParaExcluir = (adicional) => {
        setAdicionalSelecionado(adicional);
        setModo("excluir");
    };

    const iniciarCadastro = () => {
        setAdicionalSelecionado(null);
        setModo("cadastrar");
    };

    const cancelar = () => {
        setAdicionalSelecionado(null);
        setModo(null);
    };

    const adicionalFiltrados = adicional.filter(adicional => {
        const nomeInclui = adicional.nome.toLowerCase().includes(filtroNome.toLowerCase());
        const catalogoMatch = filtroCatalogo === "" || adicional.catalogo_temp === Number(filtroCatalogo);

        return nomeInclui && catalogoMatch;
    });



    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar/Excluir/Cadastrar Adicional</h2>
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
                        Cadastrar novo adicional
                    </button>

                    {/* Filtros */}
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "15px" }}>
                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="filtroNome" style={{ marginRight: "8px" }}>Filtrar por nome adicional:</label>
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

                        {/* // nova div mais elegante */}
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="filtroCatalogo" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                Filtrar por catálogo:
                            </label>
                            <select
                                id="filtroCatalogo"
                                value={filtroCatalogo}
                                onChange={e => setFiltroCatalogo(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc"
                                }}
                            >
                                <option value="">Todos</option>
                                {catalogos.map(catalogo => (
                                    <option key={catalogo.id_catalogo} value={catalogo.id_catalogo}>
                                        {catalogo.nome}
                                    </option>
                                ))}
                            </select>
                        </div>


                    </div>

                    {/* Tabela */}
                    <table
                        border="1"
                        cellPadding="5"
                        style={{ marginTop: "10px", borderCollapse: "collapse", width: "100%" }}
                    >
                        <thead style={{ backgroundColor: "#f2f2f2" }}>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Catálogo</th> {/* Coluna nova para mostrar o nome */}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adicionalFiltrados.map(adicional => {
                                // Busca o nome do catálogo pelo id_catalogo do produto
                                const catalogoNome = catalogos.find(c => c.id_catalogo === adicional.catalogo_temp)?.nome || "Não definido";

                                return (
                                    <tr key={adicional.id_adicional}>
                                        <td>{adicional.id_adicional}</td>
                                        <td>{adicional.nome}</td>
                                        <td>{adicional.valor?.toFixed(2)}</td>
                                        <td>{catalogoNome}</td>
                                        <td>
                                            <button
                                                onClick={() => selecionarParaEditar(adicional)}
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
                                                onClick={() => selecionarParaExcluir(adicional)}
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
                                );
                            })}
                            {adicionalFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                                        Nenhum adicional encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : modo === "editar" ? (
                <EditarFormularioAdicional
                    adicional={adicionalSelecionado}
                    onCancel={cancelar}
                    onUpdate={() => {
                        carregarAdicional();
                        cancelar();
                    }}
                />
            ) : modo === "cadastrar" ? (
                <CadastrarFormularioAdicional
                    adicional={null}
                    onCancel={cancelar}
                    onCreate={() => {
                        carregarAdicional();
                        cancelar();
                    }}
                />
            ) : (
                <ExcluirFormularioAdicional
                    adicional={adicionalSelecionado}
                    onCancel={cancelar}
                    onExclusaoSucesso={() => {
                        carregarAdicional();
                        cancelar();
                    }}
                />
            )}

            <BotaoVoltar />
        </div >
    );
}

export default EditarAdicional;
