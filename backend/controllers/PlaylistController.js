import Playlist from "../models/Playlist/Playlist.js";

class PlaylistController
{
  static async createPlaylist (req, res)
  {
    const { 
      nome, 
      descricao,
      donoId, 
      musicasIdsArray, // Array de Ids das Músicas
      permission
    } = req.body;

    const thumbnailPath = req.files?.thumbnailFile?.[0]?.filename ? '/backend/uploads/' + req.files?.thumbnailFile[0].filename : null;

    try
    {
        const novaPlaylist = new Playlist(nome, descricao, donoId, JSON.parse(musicasIdsArray), permission, thumbnailPath); 
        await novaPlaylist.save();
        return res.status(201).json(novaPlaylist);
    }
    catch (error)
    {
        console.error("Erro ao Criar a Playlist: ", error);
        return res.status(500).json({message: "Erro Interno ao Criar a Playlist."});
    }
  }

  static async getAllPlaylists (req, res)
  {
    try
    {
        const playlists = await Playlist.findAll();
        return res.status(200).json(playlists);
    }
    catch (error)
    {
        console.error("Erro ao Carregar as Playlists: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar as Playlists."});
    }
  }

  static async getPlaylistById (req, res)
  {
    const { id } = req.params;
    let playlist;
    try
    {
        playlist = await Playlist.findById(id);
        if (playlist)
        return res.status(200).json(playlist);
        else
        return res.status(400).json({message: "Playlist não encontrada."});
    }
    catch (error)
    {
        console.error("Erro ao Carregar a Playlist: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar a Playlist. ", playlist});
    }
  }
  
  static async getAllPlaylistsByUser (req, res)
  {
    const { id } = req.params; //userId

    try
    {
        const playlists = await Playlist.findAllByUserId(id);
        return res.status(200).json(playlists);
    }
    catch (error)
    {
        console.error("Erro ao Carregar as Playlists do Usuário: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar as Playlists do Usuário."});
    }
  }
    
  static async updatePlaylist (req, res)
  {
    const { id } = req.params;

    const {
      nome, 
      descricao,
      donoId, 
      musicasIdsArray, // Array de Ids das Músicas
      permission
    } = req.body;

    const thumbnailPath = req.files?.thumbnailFile?.[0]?.filename ? '/backend/uploads/' + req.files?.thumbnailFile[0].filename : null;

    let newPlaylist = {
      nome,
      descricao,
      donoId,
      musicasIdsArray: JSON.parse(musicasIdsArray),
      thumbnailPath,
      permission
    }
    //console.log("newPlaylist = ", newPlaylist)

    if (!thumbnailPath)
    {
      const playlist = await Playlist.findById(id);
      if (playlist)
        newPlaylist.thumbnailPath = playlist.thumbnailPath;
    }
    
    try
    {
      let updatePlaylist = await Playlist.update(id, newPlaylist);
        if (updatePlaylist)
            return res.status(201).json({updatePlaylist: updatePlaylist, message: "Playlist atualizada com Sucesso !"});
        else
            return res.status(400).json({message: "Playlist não está cadastrada."});
    }
    catch (error)
    {
        console.error("Erro ao atualizar a Playlist: ", error);
        return res.status(500).json({message: "Erro Interno ao atualizar a Playlist."});
    } 
  }

  static async deletePlaylist (req, res)
  {
    const { id } = req.params;

    try
    {
      if (await Playlist.delete(id))
        return res.status(200).json({message: "Playlist deletada com Sucesso !"});
      else
        return res.status(500).json({message: "Erro ao deletar a Playlist."});
    }
    catch (error)
    {
      console.error("Erro ao deletar a Playlist: ", error);
      return res.status(500).json({message: "Erro Interno ao deletar a Playlist."});
    } 
  }
}

export default PlaylistController;