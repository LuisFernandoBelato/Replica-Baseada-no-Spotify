import UsuarioModel from "./UsuarioSchema.js";

class Usuario
{
    constructor(nome, email, senha, logradouro, bairro, estado, cep) 
    {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.estado = estado;
        this.cep = cep;
    }

    async save () 
    {
        const novoUsuario = new UsuarioModel({
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            logradouro: this.logradouro,
            bairro: this.bairro,
            estado: this.estado,
            cep: this.cep
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