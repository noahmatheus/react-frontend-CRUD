import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import CadastrarFormularioAdicional from "../CadastrarFormularioAdicional";
import EditarFormularioAdicional from "../EditarFormularioAdicional";
import ExcluirFormularioAdicional from "../ExcluirFormularioAdicional";

function EditarAdicional() {
    const [adicional, setAdicional] = useState([]);
    const [filtroNome, setFiltroNome] = useState(""); // estado para o filtro
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
    }, [carregarAdicional]);

    const selecionarParaEditar = (adicional) => {
        setAdicionalSelecionado(adicional);
        setModo("editar");
    };

    const selecionarParaExcluir = (adicional) => {
        setAdicionalSelecionado(adicional);
        setModo("excluir");
    };

    // novo
    const iniciarCadastro = () => {
        setAdicionalSelecionado(null);
        setModo("cadastrar");
    };

    const cancelar = () => {
        setAdicionalSelecionado(null);
        setModo(null);
    };

    // Lista filtrada pela string do filtro (ignora case)
    const produtosFiltradas = adicional.filter(adicional =>
        adicional.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

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

                    {/* Campo filtro */}
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
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosFiltradas.map(adicional => (
                                <tr key={adicional.id_adicional}>
                                    <td>{adicional.id_adicional}</td>
                                    <td>{adicional.nome}</td>
                                    <td>{adicional.valor?.toFixed(2)}</td>
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
                            ))}
                            {produtosFiltradas.length === 0 && (
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
        </div>
    );

}

export default EditarAdicional;
