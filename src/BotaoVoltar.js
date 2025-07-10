import { useNavigate } from "react-router-dom";

function BotaoVoltar() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }}
        >
            Voltar
        </button>
    );
}

export default BotaoVoltar;
