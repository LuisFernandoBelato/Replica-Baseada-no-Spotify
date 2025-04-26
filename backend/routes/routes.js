import express from "express";
import AuthController from "../controllers/AuthController.js";
import UsuarioController from "../controllers/UsuarioController.js";

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

export default router;