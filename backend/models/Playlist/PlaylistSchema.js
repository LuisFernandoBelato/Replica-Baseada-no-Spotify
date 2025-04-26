import mongoose from "mongoose";
import Usuario from '../Usuario/UsuarioSchema.js';

const PlaylistSchema = new mongoose.Schema(
    {
        nome: {type: String, require: true},
        descricao: {type: String, require: true},
        dono: {type: Usuario, require: true}, // A Playlist sempre tem o vínculo de quem a criou, para saber de quem ela é
        musicas: {type: Array, require: false}, // A Playlist pode ter ou não músicas quando criada
        permission: {type: String, require: true}, // A Playlist pode ser Pública (aparece para todos), ou Privada (só aparece para aquele usuário)
        thumbnailPath: {type: String, require: true} // O Arquivo com a imagem da Capa da Playlist
    },
    {
        timestamps: true  // Cria os campos createdAt e updatedAt Automaticamente
    }
)

const PlaylistModel = mongoose.model('playlist', PlaylistSchema);

export default PlaylistModel;