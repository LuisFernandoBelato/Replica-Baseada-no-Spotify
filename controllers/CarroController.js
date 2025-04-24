import __dirname from "../utils/pathUtils.js";
import path from "path";
import Carro from "../models/Carro.js";

class CarroController
{
    static async getAllCarros (req, res)
    {
        try
        {
            const carros = await Carro.findAll();
            res.json(carros);
        }
        catch (error)
        {
            console.error("Erro ao Carregar os carros: ", error);
            res.status(500).json({message: "Erro interno ao buscar os carros"});
        }
    }
    
    static async getCarroById (req, res)
    {
        try
        {
            const { id } = req.params;
            const carro = await Carro.findById(id);

            if (carro)
                return res.json(carro);
            else
                res.status(404).json({message: "Carro não existe"});
        }
        catch (error)
        {
            console.error("Erro ao Carregar o carro: ", error);
            res.status(500).json({message: "Erro interno ao buscar o carro"});
        }
    }

    static async createCarro (req, res)
    {
        const { placa, modelo, ano, preco } = req.body;
        const carroExiste = await Carro.findByPlaca(placa);

        if (carroExiste)
            return res.status(400).json({message: "Já Existe um carro com essa placa"});

        try
        {
            const novoCarro = new Carro(placa, modelo, ano, preco); 
            await novoCarro.save();
            res.status(201).json(novoCarro);
        }
        catch (error)
        {
            console.error("Erro ao Criar o carro: ", error);
            res.status(500).json({message: "Erro interno ao Criar o carro"});
        }
    }

    static async updateCarro (req, res)
    {
        
    }

    static async deleteCarro (req, res)
    {
        
    }

    static async renderCreateCarro (req, res)
    {
        try
        {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-carro.html'))
        }
        catch (error)
        {
            console.error("Erro ao Carregar a página: ", error);
            res.status(500).json({message: "Erro interno"});
        }
        
    }

    static async renderAllCarros (req, res)
    {
        
    }
}

export default CarroController