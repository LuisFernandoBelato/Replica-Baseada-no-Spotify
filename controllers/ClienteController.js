import __dirname from "../utils/pathUtils.js";
import path from "path";
import Cliente from "../models/Cliente/Cliente.js";


class ClienteController
{

    static async renderCadastro (req, res)
    {
        try
        {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-cliente.html'));
        }
        catch (error)
        {
            console.error("Erro ao Carregar a página: ", error);
            res.status(500).json({message: "Erro interno"});
        } 
    }

    static async renderClientes (req, res)
    {
        try
        {

            const clientes = await Cliente.findAll()

            console.log(clientes)


            res.render('visualizar-cliente', {clientes: clientes});
        }
        catch (error)
        {
            console.error("Erro ao Carregar a página: ", error);
            res.status(500).json({message: "Erro interno"});
        }
        
    }

    
    static async createCliente (req, res)
    {

        const { nome, cpf, sobrenome, dataNascimento,telefone, email,senha,caminho} = req.body;
        const clienteExiste = await Cliente.findByCpf(cpf);

        if (clienteExiste)
            return res.status(400).json({message: "Ja existe um cliente com esse CPF"});

        try
        {
            const novoCliente = new Cliente(nome, sobrenome, cpf, dataNascimento,telefone,email,senha,caminho); 
            await novoCliente.save();
            res.status(201).json(novoCliente);
        }
        catch (error)
        {
            console.error("Erro ao Criar o cliente: ", error);
            res.status(500).json({message: "Erro interno ao Criar o cliente"});
        }
    }

    static async updateCliente (req, res){

        const cliente = await Cliente.findOne({ cpf: cpf });
        const clienteId = cliente._id;
        if(await Cliente.update(clienteId,cliente))
            res.status(201).json({message: "Cliente atualizado com sucesso"});
        
        else
        {
            console.error("Erro ao atualizar cliente: ", error);
            res.status(500).json({message: "Erro ao atualizar cliente"});
        }

    }

    

}

export default ClienteController