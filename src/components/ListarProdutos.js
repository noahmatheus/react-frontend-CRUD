import { useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";

function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [erro, setErro] = useState("");

    const carregarProdutos = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://renderproject-deploy.onrender.com/api/produtos/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar produtos");
            }

            const data = await response.json();
            setProdutos(data);
        } catch (err) {
            setErro("Erro ao carregar produtos");
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Lista de Produtos</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(({ id_produto, nome, preco, descricao }) => (
                        <tr key={id_produto}>
                            <td>{id_produto}</td>
                            <td>{nome}</td>
                            <td>R$ {preco?.toFixed(2)}</td>
                            <td>{descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <BotaoVoltar />
        </div>
    );
}

export default ListarProdutos;
