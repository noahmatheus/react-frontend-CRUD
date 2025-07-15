function ExcluirFormularioAdicional({ adicional, onCancel, onExclusaoSucesso }) {

    const handleExcluir = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://renderproject-deploy.onrender.com/api/adicional/${adicional.id_adicional}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Erro ao excluir");

            alert("Adicional excluído com sucesso!");
            onExclusaoSucesso();
        } catch (err) {
            alert("Erro ao excluir adicional.");
        }
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Deseja excluir a adicional "{adicional.nome}"?</h3>
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={handleExcluir}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1
                    }}>
                    Confirmar Exclusão
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
                    }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ExcluirFormularioAdicional;