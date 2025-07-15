import { useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";

function ListarAdicional() {
    const [adicional, setAdicional] = useState([]);
    const [erro, setErro] = useState("");

    const carregarAdicional = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://renderproject-deploy.onrender.com/api/adicional/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar adicional");
            }

            const data = await response.json();
            setAdicional(data);
        } catch (err) {
            setErro("Erro ao carregar adicional");
        }
    };

    useEffect(() => {
        carregarAdicional();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Lista de Adicional</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {adicional.map(({ id_adicional, nome, valor }) => (
                        <tr key={id_adicional}>
                            <td>{id_adicional}</td>
                            <td>{nome}</td>
                            <td>R$ {valor?.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <BotaoVoltar />
        </div>
    );
}

export default ListarAdicional;
