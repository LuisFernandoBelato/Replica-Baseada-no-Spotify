import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
    {
        nome: {type: String, require: true},
        descricao: {type: String, require: true},
        dono: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // A Playlist sempre tem o vínculo de quem a criou, para saber de quem ela é
        musicas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musica' }], // A Playlist pode ter ou não músicas quando criada
        permission: {type: String, require: true}, // A Playlist pode ser Pública (aparece para todos), ou Privada (só aparece para aquele usuário)
        thumbnailPath: {type: String, require: true} // O Arquivo com a imagem da Capa da Playlist
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);

export default PlaylistModel;