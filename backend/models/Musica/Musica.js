import MusicaModel from "./MusicaSchema.js";

class Musica
{
    constructor (nome, autor, filePath, genero)
    {
        this.nome = nome;
        this.autor = autor ? autor : null; // _id do Autor
        this.filePath = filePath ? filePath : null;
        this.genero = genero;
    }

    async save () 
    {
        const novaMusica = new MusicaModel({
            nome: this.nome,
            autor: this.autor,
            filePath: this.filePath,
            genero: this.genero
        });

        return await novaMusica.save();
    }
    static async findAll () 
    {
        return await MusicaModel.find();
    }
    static async findById (id) 
    {
        return await MusicaModel.findById(id);
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