import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import CadastrarFormularioProduto from "../CadastrarFormularioProduto";
import EditarFormularioProduto from "../EditarFormularioProduto";
import ExcluirFormularioProduto from "../ExcluirFormularioProduto";

function EditarProduto() {
    const [produtos, setProdutos] = useState([]);
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroCatalogo, setFiltroCatalogo] = useState("");
    const [catalogos, setCatalogos] = useState([]);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modo, setModo] = useState(null);
    const [erro, setErro] = useState("");

    const carregarProdutos = useCallback(() => {
        const token = localStorage.getItem("token");

        fetch("https://renderproject-deploy.onrender.com/api/produtos/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar produtos");
                }
                return res.json();
            })
            .then(data => setProdutos(data))
            .catch(() => setErro("Erro ao carregar produtos"));
    }, []);

    useEffect(() => {
        carregarProdutos();

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
    }, [carregarProdutos]);

    const selecionarParaEditar = (produto) => {
        setProdutoSelecionado(produto);
        setModo("editar");
    };

    const selecionarParaExcluir = (produto) => {
        setProdutoSelecionado(produto);
        setModo("excluir");
    };

    const iniciarCadastro = () => {
        setProdutoSelecionado(null);
        setModo("cadastrar");
    };

    const cancelar = () => {
        setProdutoSelecionado(null);
        setModo(null);
    };

    const produtosFiltradas = produtos.filter(produto => {
        const nomeInclui = produto.nome.toLowerCase().includes(filtroNome.toLowerCase());
        const catalogoMatch = filtroCatalogo === "" || produto.catalogo_temp === Number(filtroCatalogo);

        // console.log("Verificando produto:", {
        //     id_produto: produto.id_produto,
        //     nome: produto.nome,
        //     catalogo_temp: produto.catalogo_temp,
        //     filtroNome,
        //     filtroCatalogo,
        //     nomeInclui,
        //     catalogoMatch,
        //     seraExibido: nomeInclui && catalogoMatch
        // });

        return nomeInclui && catalogoMatch;
    });



    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar/Excluir/Cadastrar Produtos</h2>
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
                        Cadastrar novo produto
                    </button>

                    {/* Filtros */}
                    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "15px" }}>
                        <div>
                            <label htmlFor="filtroNome" style={{ marginRight: "8px" }}>Filtrar por nome produto:</label>
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
                                <th>Descrição</th>
                                <th>Catálogo</th> {/* Coluna nova para mostrar o nome */}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosFiltradas.map(produto => {
                                // Busca o nome do catálogo pelo id_catalogo do produto
                                const catalogoNome = catalogos.find(c => c.id_catalogo === produto.catalogo_temp)?.nome || "Não definido";

                                return (
                                    <tr key={produto.id_produto}>
                                        <td>{produto.id_produto}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.valor?.toFixed(2)}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{catalogoNome}</td>
                                        <td>
                                            <button
                                                onClick={() => selecionarParaEditar(produto)}
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
                                                onClick={() => selecionarParaExcluir(produto)}
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
                            {produtosFiltradas.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                                        Nenhum produto encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : modo === "editar" ? (
                <EditarFormularioProduto
                    produto={produtoSelecionado}
                    onCancel={cancelar}
                    onUpdate={() => {
                        carregarProdutos();
                        cancelar();
                    }}
                />
            ) : modo === "cadastrar" ? (
                <CadastrarFormularioProduto
                    produto={null}
                    onCancel={cancelar}
                    onCreate={() => {
                        carregarProdutos();
                        cancelar();
                    }}
                />
            ) : (
                <ExcluirFormularioProduto
                    produto={produtoSelecionado}
                    onCancel={cancelar}
                    onExclusaoSucesso={() => {
                        carregarProdutos();
                        cancelar();
                    }}
                />
            )}

            <BotaoVoltar />
        </div>
    );
}

export default EditarProduto;
