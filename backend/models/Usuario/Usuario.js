import UsuarioModel from "./UsuarioSchema.js";

class Usuario
{
    constructor (nome, email, senha)
    {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    async save () 
    {
        const novoUsuario = new UsuarioModel({
            nome: this.nome,
            email: this.email,
            senha: this.senha
        });

        return await novoUsuario.save();
    }
    static async findAll () 
    {
        return await UsuarioModel.find();
    }
    static async findById (id) 
    {
        return await UsuarioModel.findById(id);
    }
    static async findByEmail (email)
    {
        return await UsuarioModel.find({email: email});
    }
    static async update (id, data)
    {
        return await UsuarioModel.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete (id) 
    {
        return await UsuarioModel.findByIdAndDelete(id);
    }
}

export default Usuario;