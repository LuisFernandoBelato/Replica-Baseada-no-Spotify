import Usuario from "../models/Usuario/Usuario.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

class AuthController
{
    static async Login(req, res) {
        const { email, senha } = req.body;

        console.log("JWT_SECRET: ", JWT_SECRET);

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            let user = await Usuario.findByEmail(email);
            console.log("User: ", user);
            if (!user) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }

            console.log("Senha:",senha);
            console.log("Senha do usuário:",user.senha);

            const isValidPassword = await bcrypt.compare(senha, user.senha);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: "1d" }
            );

            console.log("Token: ", token);

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Pois é um ambiente de desenvolvimento apenas
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 // 1 dia
            });

            // Retorna os dados do usuário junto com o token
            return res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    nome: user.nome
                }
            });
        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    static async Logout(req, res) {
        res.clearCookie('token');
        return res.status(200).json({ message: "Logout realizado com sucesso" });
    }
}

export default AuthController;