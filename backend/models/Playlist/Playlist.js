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
    static async findAllByUserId(userId) 
    {
        // path: 'dono' indica que queremos carregar os dados do usuário que criou a playlist
        // select: 'nome email' especifica quais campos do usuário devem ser retornados

        // o primeiro populate é para pegar os dados da referencia do usuário
        // o segundo populate é para pegar os dados da referencia das músicas
        
        return await PlaylistModel.find({ dono: userId })
          .populate({
            path: 'dono',
            select: 'nome email'
          })
          .populate({
            path: 'musicas',
            select: 'nome autor genero'
          });
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