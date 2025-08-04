import { useEffect, useState } from "react";

function UploadImagem({ tipo, idConfiguracao, onUploadSuccess }) {
    const [arquivo, setArquivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [erro, setErro] = useState("");
    const [imagemAtual, setImagemAtual] = useState(null);

    // Buscar imagens disponíveis
    const buscarImagens = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://renderproject-deploy.onrender.com/api/configuracao/imagens", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (res.ok) {
                const imagens = await res.json();
                // Filtrar imagem do tipo atual (logo ou banner)
                const imagemTipo = imagens.find(img => 
                    tipo === 'logo' ? img.includes('logo') : img.includes('banner')
                );
                
                if (imagemTipo) {
                    setImagemAtual(`https://renderproject-deploy.onrender.com/api/configuracao/imagem/${imagemTipo}`);
                } else {
                    setImagemAtual(null);
                }
            }
        } catch (err) {
            console.error("Erro ao buscar imagens:", err);
        }
    };

    useEffect(() => {
        buscarImagens();
    }, [tipo]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArquivo(file);
            // Criar preview
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!arquivo) {
            setErro("Selecione um arquivo primeiro");
            return;
        }

        setUploading(true);
        setErro("");

        const formData = new FormData();
        formData.append('file', arquivo);
        formData.append('id_configuracao', idConfiguracao);

        const endpoint = tipo === 'logo' 
            ? '/api/configuracao/uploadImagemLogo'
            : '/api/configuracao/uploadImagemBanner';

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://renderproject-deploy.onrender.com${endpoint}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (res.ok) {
                alert(`${tipo === 'logo' ? 'Logo' : 'Banner'} enviado com sucesso!`);
                setArquivo(null);
                setPreview(null);
                // Recarregar imagens após upload
                await buscarImagens();
                if (onUploadSuccess) onUploadSuccess();
            } else {
                const data = await res.json();
                setErro(data.message || "Erro ao fazer upload");
            }
        } catch (err) {
            setErro("Erro de conexão");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "15px", 
            marginBottom: "20px",
            background: "#f9f9f9"
        }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {tipo === 'logo' ? 'Logo' : 'Banner'}
            </h4>
            
            {/* Preview da imagem atual */}
            {imagemAtual && (
                <div style={{ marginBottom: "15px" }}>
                    <p style={{ fontSize: "14px", margin: "0 0 8px 0" }}>Imagem atual:</p>
                    <img 
                        src={imagemAtual} 
                        alt={tipo === 'logo' ? 'Logo atual' : 'Banner atual'}
                        style={{ 
                            maxWidth: "200px", 
                            maxHeight: "100px", 
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            objectFit: "contain"
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div style={{ 
                        display: 'none', 
                        padding: '20px', 
                        background: '#eee', 
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#666',
                        maxWidth: "200px",
                        maxHeight: "100px"
                    }}>
                        Imagem não disponível
                    </div>
                </div>
            )}

            {/* Preview da nova imagem */}
            {preview && (
                <div style={{ marginBottom: "15px" }}>
                    <p style={{ fontSize: "14px", margin: "0 0 8px 0" }}>Nova imagem:</p>
                    <img 
                        src={preview} 
                        alt="Preview"
                        style={{ 
                            maxWidth: "200px", 
                            maxHeight: "100px", 
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            objectFit: "contain"
                        }}
                    />
                </div>
            )}

            {/* Upload */}
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: "10px" }}
                />
            </div>

            {arquivo && (
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    style={{
                        backgroundColor: uploading ? "#ccc" : "#007bff",
                        color: "#fff",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: uploading ? "not-allowed" : "pointer",
                        fontSize: "14px"
                    }}
                >
                    {uploading ? "Enviando..." : `Enviar ${tipo === 'logo' ? 'Logo' : 'Banner'}`}
                </button>
            )}

            {erro && (
                <p style={{ color: "red", fontSize: "14px", margin: "10px 0 0 0" }}>{erro}</p>
            )}
        </div>
    );
}

export default UploadImagem; 