import mongoose from "mongoose";

const MusicaSchema = new mongoose.Schema(
    {
        nome: {type: String, require: true},
        autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Referência ao _id da coleção 'Usuario'
        filePath: {type: String, require: true},
        genero: {type: String, require: true},
        thumbnailPath: {type: String, require: true},
        artist: {type: String, require: true}
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const MusicaModel = mongoose.model('Musica', MusicaSchema);

export default MusicaModel;