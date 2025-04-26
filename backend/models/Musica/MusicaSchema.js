import mongoose from "mongoose";
import Usuario from '../Usuario/UsuarioSchema.js';

const MusicaSchema = new mongoose.Schema(
    {
        nome: {type: String, require: true},
        autor: {type: Usuario, require: true}, // Um usuário comum do sistema
        filePath: {type: String, require: true},
        genero: {type: String, require: true}
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const MusicaModel = mongoose.model('musica', MusicaSchema);

export default MusicaModel;