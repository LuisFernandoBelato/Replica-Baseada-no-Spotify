import __dirname from "../utils/pathUtils.js";
import path from "path";
import Funcionario from "../models/Funcionario/Funcionario.js";

class FuncionarioController
{

    static async renderCadastro (req, res)
    {
        try
        {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-funcionario.html'))
        }
        catch (error)
        {
            console.error("Erro ao Carregar a página: ", error);
            res.status(500).json({message: "Erro interno"});
        }
    }

    static async createFuncionario (req, res)
    {
        const 
        { 
            inputNomeFunc,
            inputSobrenomeFunc,
            inputCPFFunc, 
            inputDataNascFunc, 
            inputTelefoneFunc, 
            inputCargoFunc,
            inputSalarioFunc,
            inputEmailFunc,
            inputSenha,
            inputFoto
        } = req.body;

        const funcionarioExiste = await Funcionario.findByCpf(inputCPFFunc);

        if (funcionarioExiste)
            return res.status(400).json({message: "Ja existe uma pessoa com esse CPF"});

        try
        {
            const novoFuncionario = new Funcionario(
                inputNomeFunc,
                inputSobrenomeFunc,
                inputCPFFunc, 
                inputDataNascFunc, 
                inputTelefoneFunc, 
                inputCargoFunc,
                inputSalarioFunc,
                inputEmailFunc,
                inputSenha,
                inputFoto
            ); 
            await novoFuncionario.save();
            res.status(201).json(novoFuncionario);
        }
        catch (error)
        {
            console.error("Erro ao Criar o funcionario: ", error);
            res.status(500).json({message: "Erro interno ao Criar o funcionario"});
        }
    }

    static async updateFuncionario (req, res)
    {
        const funcionario = await Funcionario.findOne({ cpf: cpf });
        const funcionarioId = funcionario._id;
        if(await Funcionario.update(funcionarioId, funcionario))
            res.status(201).json({message: "Funcionario atualizado com sucesso"});
        
        else
        {
            console.error("Erro ao atualizar funcionario: ", error);
            res.status(500).json({message: "Erro ao atualizar funcionario"});
        }
    }

    static async renderVerFuncionarios (req, res)
    {
        try 
        {
            const funcionarios = await Funcionario.findAll();
            res.render('visualizar-funcionario.ejs', { funcionarios : funcionarios });
        } 
        catch (error) 
        {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }

}

export default FuncionarioController