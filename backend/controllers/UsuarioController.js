import Usuario from "../models/Usuario/Usuario.js";

class UsuarioController
{
  static async createUsuario (req, res)
  {
    const { 
      nome, 
      email, 
      senha
    } = req.body;

    const usuarioExiste = await Usuario.findByEmail(email);
    if (usuarioExiste == [])
        return res.status(400).json({message: "Já existe um Usuário com esse Email."});

    try
    {
        const novoUsuario = new Usuario(nome, email, senha); 
        await novoUsuario.save();
        return res.status(201).json(novoUsuario);
    }
    catch (error)
    {
        console.error("Erro ao Criar o Usuario: ", error);
        return res.status(500).json({message: "Erro Interno ao Criar o Usuario."});
    }
  }

  static async getAllUsuarios (req, res)
  {
    try
    {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    }
    catch (error)
    {
        console.error("Erro ao Carregar os Usuários: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar os Usuários."});
    }
  }

  static async getUsuarioById (req, res)
  {
    const { id } = req.params;
    let usuario;
      try
      {
          usuario = await Usuario.findById(id);
          if (usuario)
            return res.status(200).json(usuario);
          else
            return res.status(400).json({message: "Usuário não encontrado."});
      }
      catch (error)
      {
          console.error("Erro ao Carregar o Usuário: ", error);
          return res.status(500).json({message: "Erro Interno ao Carregar o Usuário. ", usuario});
      }
  }
    
  static async updateUsuario (req, res)
  {
    const { id } = req.params;
    const newUsuario = req.body;
  
    try
    {
        if (await Usuario.update(id, newUsuario))
          return res.status(201).json({updateUsuario: newUsuario, message: "Usuário atualizado com sucesso !"});
        else
          return res.status(400).json({message: "Usuário não está cadastrado."});
    }
    catch (error)
    {
      console.error("Erro ao atualizar o Usuário: ", error);
      return res.status(500).json({message: "Erro Interno ao atualizar o Usuário."});
    } 
  }

  static async deleteUsuario (req, res)
  {
    const { id } = req.params;

    try
    {
      if (await Usuario.delete(id))
        return res.status(200).json({message: "Usuário deletado com Sucesso !"});
      else
        return res.status(500).json({message: "Erro ao atualizar o Usuário."});
    }
    catch (error)
    {
      console.error("Erro ao deletar o Usuário: ", error);
      return res.status(500).json({message: "Erro Interno ao deletar o Usuário."});
    } 
  }
}

export default UsuarioController;