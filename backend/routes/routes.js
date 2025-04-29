import express from "express";
import AuthController from "../controllers/AuthController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import MusicaController from "../controllers/MusicaController.js";
import PlaylistController from "../controllers/PlaylistController.js";

const router = express.Router();

// AUTENTICAÇÃO

router.post("/login", AuthController.Login);

// USUÁRIOS

router.post("/create-user", UsuarioController.createUsuario);
router.get("/get-users", UsuarioController.getAllUsuarios);
router.get("/get-user/:id", UsuarioController.getUsuarioById);
router.put("/edit-user/:id", UsuarioController.updateUsuario);
router.delete("/delete-user/:id", UsuarioController.deleteUsuario);

// MÚSICAS

router.post("/create-music", MusicaController.createMusica);
router.get("/get-musics", MusicaController.getAllMusicas);
router.get("/get-music/:id", MusicaController.getMusicaById);
router.put("/edit-music/:id", MusicaController.updateMusica);
router.delete("/delete-music/:id", MusicaController.deleteMusica);

// PLAYLIST

router.post("/create-playlist", PlaylistController.createPlaylist);
router.get("/get-playlists", PlaylistController.getAllPlaylists);
router.get("/get-playlist/:id", PlaylistController.getPlaylistById);
router.put("/edit-playlist/:id", PlaylistController.updatePlaylist);
router.delete("/delete-playlist/:id", PlaylistController.deletePlaylist);


// PENSAR EM COMO FAZER O GET DE PLAYLIST TRAZER SÓ AS PLAYLISTS DELE - TALVEZ USAR OS PERMISSIONS
// PENSAR EM COMO FAZER O GET DE MÚSICAS TRAZER SÓ AS MÚSICAS DELE (PRO USUÁRIO ATUALIZAR E DELETAR SÓ AS DELE, O RESTO É PÚBLICO)

    // - O PROBLEMA AQUI É QUE VINDO DO FRONT, AINDA NÃO SABEMOS QUAL USUÁRIO QUE ESTÁ FAZENDO A REQUISIÇÃO

    
export default router;