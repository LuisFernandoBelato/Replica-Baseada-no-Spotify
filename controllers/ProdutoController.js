import __dirname from "../utils/pathUtils.js";
import path from "path";
import Produto from "../models/Produto/Produto.js";


class ProdutoController
{
    static async createProduto (req, res)
    {
        const 
        { 
            inputNomeProd,
            inputFabricanteProd,
            inputDescricaoProd, 
            inputValorProd, 
            inputQtdProd, 
            inputFoto
        } = req.body;

        try
        {
            const novoProduto = new Produto(
                inputNomeProd,
                inputFabricanteProd,
                inputDescricaoProd, 
                inputValorProd, 
                inputQtdProd, 
                inputFoto
            ); 
            await novoProduto.save();
            res.status(201).json(novoProduto);
        }
        catch (error)
        {
            console.error("Erro ao Criar o produto: ", error);
            res.status(500).json({message: "Erro interno ao Criar o produto"});
        }
    }

    static async updateProduto (req, res)
    {
        const produto = await Produto.findOne({ id: id });
        const produtoId = produto._id;
        if(await Produto.update(produtoId, produto))
            res.status(201).json({message: "Produto atualizado com sucesso"});
        
        else
        {
            console.error("Erro ao atualizar produto: ", error);
            res.status(500).json({message: "Erro ao atualizar produto"});
        }
    }

    static async renderCadastro (req, res)
    {
        try
        {
            res.sendFile(path.join(__dirname, 'views', 'cadastrar-produto.html'))
        }
        catch (error)
        {
            console.error("Erro ao Carregar a página: ", error);
            res.status(500).json({message: "Erro interno"});
        }
    }

    static async renderVerProduto (req, res)
    {
        try 
        {
            const produtos = await Produto.findAll();
            console.log("produtos = ", produtos)
            res.render('visualizar-produto.ejs', {produtos: produtos});
        } 
        catch (error) 
        {
            console.error('Erro ao carregar a página:', error);
            res.status(500).send('Erro interno');
        }
    }
}

export default ProdutoController;