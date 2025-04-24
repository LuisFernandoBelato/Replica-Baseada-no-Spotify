import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
    {
        nome: {type: String, require: true},
        email: {type: String, require: true},
        senha: {type: String, require: true}
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const UsuarioModel = mongoose.model('usuario', UsuarioSchema);

export default UsuarioModel;