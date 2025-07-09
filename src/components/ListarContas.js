import { useEffect, useState } from "react";

function ListaContas() {
    const [contas, setContas] = useState([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://vps.plenusti.com.br:61346/cosmos/api/conta/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || "Erro ao buscar contas");
                }
                return res.json();
            })
            .then((data) => setContas(data))
            .catch((err) => setErro(err.message));
    }, []);

    return (
        <div>
            <h2>Lista de Contas</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Since</th>
                    </tr>
                </thead>
                <tbody>
                    {contas.map(({ id_conta, nome, login, email, since }) => (
                        <tr key={id_conta}>
                            <td>{id_conta}</td>
                            <td>{nome}</td>
                            <td>{login}</td>
                            <td>{email}</td>
                            <td>{since}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaContas;
