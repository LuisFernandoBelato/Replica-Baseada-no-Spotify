import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        nome: {type: String, require: true},
        email: {type: String, require: true, unique: true},
        senha: {type: String, require: true}
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

export default UsuarioModel;