import express from "express";
import AuthController from "../controllers/AuthController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import MusicaController from "../controllers/MusicaController.js";
import PlaylistController from "../controllers/PlaylistController.js";
import upload from "../utils/upload.js";

const router = express.Router();

// AUTENTICAÇÃO

router.post("/login", AuthController.Login);
router.post("/logout", AuthController.Logout);
router.get("/verify-auth", (req, res) => {
    // Se chegou aqui, significa que o middleware de autenticação já verificou o token
    res.status(200).json({ message: "Autenticado" });
});

// USUÁRIOS

router.post("/create-user", UsuarioController.createUsuario);
router.get("/get-users", UsuarioController.getAllUsuarios);
router.get("/get-user/:id", UsuarioController.getUsuarioById);
router.put("/edit-user/:id", UsuarioController.updateUsuario);
router.delete("/delete-user/:id", UsuarioController.deleteUsuario);

// MÚSICAS

router.post("/create-music", upload.fields([
  { name: 'audioFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]), MusicaController.createMusica);

router.get("/get-musics", MusicaController.getAllMusicas);
router.get("/get-music/:id", MusicaController.getMusicaById);

router.put("/edit-music/:id", upload.fields([
  { name: 'audioFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]), MusicaController.updateMusica);

router.delete("/delete-music/:id", MusicaController.deleteMusica);

router.get("/get-musics-by-user/:id", MusicaController.getAllMusicsByUser);

// PLAYLIST

router.post("/create-playlist", upload.fields([
  { name: 'thumbnailFile', maxCount: 1 }
]), PlaylistController.createPlaylist);

router.get("/get-playlists", PlaylistController.getAllPlaylists);
router.get("/get-playlist/:id", PlaylistController.getPlaylistById);

router.put("/edit-playlist/:id", upload.fields([
  { name: 'thumbnailFile', maxCount: 1 }
]), PlaylistController.updatePlaylist);

router.delete("/delete-playlist/:id", PlaylistController.deletePlaylist);

router.get("/get-playlists-by-user/:id", PlaylistController.getAllPlaylistsByUser);


// TRAZER NOME DO DONO NO GET DE MÚSICAS E GET DE PLAYLIST
    
export default router;