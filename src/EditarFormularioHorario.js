import { useState } from "react";

function EditarFormularioHorario({ horario, onCancel, onUpdate }) {
    const [diaSemana, setDiaSemana] = useState(horario.dia_semana);
    const [nomeDia, setNomeDia] = useState(horario.nome_dia);
    const [horaAbertura, setHoraAbertura] = useState(horario.hora_abertura);
    const [horaFechamento, setHoraFechamento] = useState(horario.hora_fechamento);

    const handleSalvar = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`https://renderproject-deploy.onrender.com/api/horariofuncionamento/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id_horario_funcionamento: horario.id_horario_funcionamento,
                    dia_semana: diaSemana,
                    nome_dia: nomeDia,
                    hora_abertura: horaAbertura,
                    hora_fechamento: horaFechamento
                }),
            });
            if (res.ok) {
                alert("Horário atualizado com sucesso!");
                onUpdate();
            } else {
                const erro = await res.json();
                alert("Erro ao atualizar: " + (erro.message || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro ao atualizar horário:", err);
            alert("Erro de conexão.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "20px auto" }}>
            <h3 style={{ marginBottom: "20px" }}>Editando horário: {nomeDia}</h3>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Dia da Semana (número):</label>
                <input
                    type="number"
                    value={diaSemana}
                    onChange={e => setDiaSemana(e.target.value)}
                    min="0"
                    max="6"
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nome do Dia:</label>
                <input
                    type="text"
                    value={nomeDia}
                    onChange={e => setNomeDia(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Hora de Abertura:</label>
                <input
                    type="time"
                    value={horaAbertura}
                    onChange={e => setHoraAbertura(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Hora de Fechamento:</label>
                <input
                    type="time"
                    value={horaFechamento}
                    onChange={e => setHoraFechamento(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
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

export default EditarFormularioHorario; 