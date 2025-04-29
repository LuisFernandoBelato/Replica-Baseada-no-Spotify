import Musica from "../models/Musica/Musica.js";

class MusicaController
{
  static async createMusica (req, res)
  {
    const { 
      nome, 
      autorId, 
      filePath,
      genero
    } = req.body;

    try
    {
        const novaMusica = new Musica(nome, autorId, filePath, genero); 
        await novaMusica.save();
        return res.status(201).json(novaMusica);
    }
    catch (error)
    {
        console.error("Erro ao Criar a Musica: ", error);
        return res.status(500).json({message: "Erro interno ao Criar a Musica."});
    }
  }

  static async getAllMusicas (req, res)
  {
    try
    {
        const musicas = await Musica.findAll();
        return res.status(200).json(musicas);
    }
    catch (error)
    {
        console.error("Erro ao Carregar as Musicas: ", error);
        return res.status(500).json({message: "Erro ao Carregar as Musicas."});
    }
  }

  static async getMusicaById (req, res)
  {
    const { id } = req.params;
    let musica;
    try
    {
        musica = await Musica.findById(id);
        if (musica)
        return res.status(200).json(musica);
        else
        return res.status(400).json({message: "Música não encontrada."});
    }
    catch (error)
    {
        console.error("Erro ao Carregar a Música: ", error);
        return res.status(500).json({message: "Erro ao Carregar a Música. ", musica});
    }
  }
    
  static async updateMusica (req, res)
  {
    const { id } = req.params;
    const newMusica = req.body;

    try
    {
        if (await Musica.update(id, newMusica))
            return res.status(201).json({updateMusica: newMusica, message: "Música atualizada com Sucesso !"});
        else
            return res.status(400).json({message: "Música não está cadastrada."});
    }
    catch (error)
    {
        console.error("Erro ao atualizar a Música: ", error);
        return res.status(500).json({message: "Erro ao atualizar a Música."});
    } 
  }

  static async deleteMusica (req, res)
  {
    const { id } = req.params;

    try
    {
      if (await Musica.delete(id))
        return res.status(200).json({message: "Música deletada com Sucesso !"});
      else
        return res.status(500).json({message: "Erro ao atualizar a Música."});
    }
    catch (error)
    {
      console.error("Erro ao deletar a Música: ", error);
      return res.status(500).json({message: "Erro ao deletar a Música."});
    } 
  }
}

export default MusicaController;