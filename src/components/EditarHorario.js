import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import EditarFormularioHorario from "../EditarFormularioHorario";

function EditarHorario() {
    const [horarios, setHorarios] = useState([]);
    const [filtroDia, setFiltroDia] = useState("");
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const [modo, setModo] = useState(null);
    const [erro, setErro] = useState("");

    const carregarHorarios = useCallback(() => {
        const token = localStorage.getItem("token");
        fetch("https://renderproject-deploy.onrender.com/api/horariofuncionamento/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar horários");
                }
                return res.json();
            })
            .then(data => setHorarios(data))
            .catch(() => setErro("Erro ao carregar horários"));
    }, []);

    useEffect(() => {
        carregarHorarios();
    }, [carregarHorarios]);

    const selecionarParaEditar = (horario) => {
        setHorarioSelecionado(horario);
        setModo("editar");
    };

    const cancelar = () => {
        setHorarioSelecionado(null);
        setModo(null);
    };

    const horariosFiltrados = horarios.filter(horario => {
        const diaInclui = horario.nome_dia.toLowerCase().includes(filtroDia.toLowerCase());
        return diaInclui;
    });

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar Horários de Funcionamento</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {!modo ? (
                <>
                    {/* Filtro */}
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="filtroDia" style={{ marginRight: "8px" }}>Filtrar por dia da semana:</label>
                        <input
                            id="filtroDia"
                            type="text"
                            value={filtroDia}
                            onChange={e => setFiltroDia(e.target.value)}
                            placeholder="Digite o dia da semana"
                            style={{
                                padding: "6px 10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "250px",
                                maxWidth: "100%",
                            }}
                        />
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
                                <th>Dia da Semana</th>
                                <th>Nome do Dia</th>
                                <th>Hora de Abertura</th>
                                <th>Hora de Fechamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horariosFiltrados.map(horario => (
                                <tr key={horario.id_horario_funcionamento}>
                                    <td>{horario.id_horario_funcionamento}</td>
                                    <td>{horario.dia_semana}</td>
                                    <td>{horario.nome_dia}</td>
                                    <td>{horario.hora_abertura}</td>
                                    <td>{horario.hora_fechamento}</td>
                                    <td>
                                        <button
                                            onClick={() => selecionarParaEditar(horario)}
                                            style={{
                                                backgroundColor: "#007bff",
                                                color: "#fff",
                                                padding: "6px 12px",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {horariosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                                        Nenhum horário encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <EditarFormularioHorario
                    horario={horarioSelecionado}
                    onCancel={cancelar}
                    onUpdate={() => {
                        carregarHorarios();
                        cancelar();
                    }}
                />
            )}

            <BotaoVoltar />
        </div>
    );
}

export default EditarHorario;