import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        senha: { type: String, required: true },
        logradouro: { type: String, required: false },
        bairro: { type: String, required: false },
        estado: { type: String, required: false },
        cep: { type: String, required: false }
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

export default UsuarioModel;