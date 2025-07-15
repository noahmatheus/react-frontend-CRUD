import { useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";

function ListarCatalogo() {
    const [catalogo, setCatalogo] = useState([]);
    const [erro, setErro] = useState("");

    const carregarCatalogo = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://renderproject-deploy.onrender.com/api/catalogo/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar catalogo");
            }

            const data = await response.json();
            setCatalogo(data);
        } catch (err) {
            setErro("Erro ao carregar catalogo");
        }
    };

    useEffect(() => {
        carregarCatalogo();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Lista de Catalogo</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {catalogo.map(({ id_catalogo, nome }) => (
                        <tr key={id_catalogo}>
                            <td>{id_catalogo}</td>
                            <td>{nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <BotaoVoltar />
        </div>
    );
}

export default ListarCatalogo;
