import PlaylistModel from "./PlaylistSchema.js";

class Playlist
{
    constructor (nome, descricao, dono, musicas, permission, thumbnailPath)
    {
        this.nome = nome;
        this.descricao = descricao;
        this.dono = dono; // Usuário que criou a Playlist - Id
        this.musicas = musicas ? musicas : []; // Lista de Músicas,
        this.permission = permission;
        this.thumbnailPath = thumbnailPath; // Arquivo da Capa da Playlist
    }

    async save () 
    {
        const novaPlaylist = new PlaylistModel({
            nome: this.nome,
            descricao: this.descricao,
            dono: this.dono,
            musicas: this.musicas ? this.musicas : [],
            permission: this.permission,
            thumbnailPath: this.thumbnailPath
        });

        return await novaPlaylist.save();
    }
    static async findAll () 
    {
        return await PlaylistModel.find();
    }
    static async findById (id) 
    {
        return await PlaylistModel.findById(id);
    }
    static async update (id, data)
    {
        return await PlaylistModel.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete (id) 
    {
        return await PlaylistModel.findByIdAndDelete(id);
    }
}

export default Playlist;