import MusicaModel from "./MusicaSchema.js";

class Musica
{
    constructor (nome, autor, filePath, thumbnailPath, genero, artist)
    {
        this.nome = nome;
        this.autor = autor ? autor : null; // _id do Autor
        this.filePath = filePath; // Arquivo do Áudio 
        this.thumbnailPath = thumbnailPath; // Arquivo da Capa
        this.genero = genero;
        this.artist = artist
    }

    async save () 
    {
        const novaMusica = new MusicaModel({
            nome: this.nome,
            autor: this.autor,
            filePath: this.filePath,
            thumbnailPath: this.thumbnailPath,
            genero: this.genero,
            artist: this.artist
        });

        return await novaMusica.save();
    }
    static async findAll () 
    {
        return await MusicaModel.find()
        .populate({
            path: 'autor',
            select: 'nome email logradouro bairro estado cep'
        });
    }
    static async findById (id) 
    {
        return await MusicaModel.findById(id)
        .populate({
            path: 'autor',
            select: 'nome email logradouro bairro estado cep'
        });
    }
    static async findAllByUserId(userId) 
    {
        // path: 'autor' indica que queremos carregar os dados do usuário que criou as músicas
        // select: 'nome email' especifica quais campos do usuário devem ser retornados

        // o populate é para pegar os dados da referencia do usuário
        // Ou seja, pega todas as músicas que no campo autor (Usuário), o id é igual ao parametro
            // e trás somente os campos 'nome' e 'email'
        
        return await MusicaModel.find({ autor: userId })
          .populate({
            path: 'autor',
            select: 'nome email logradouro bairro estado cep'
          });
    }
    static async update (id, data)
    {
        return await MusicaModel.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete (id) 
    {
        return await MusicaModel.findByIdAndDelete(id);
    }
}

export default Musica;