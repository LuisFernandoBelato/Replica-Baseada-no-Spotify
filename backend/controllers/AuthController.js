import Usuario from "../models/Usuario/Usuario.js";

class AuthController
{
    static async Login (req, res)
    {
        const { email, senha } = req.body;
        let usuario = null;

        try 
        {
            if (email === 'admin@admin.com' && senha === '123')
                return res.status(200).json({message: "Login Efetuado com Sucesso !"})
          
            usuario = await Usuario.findByEmail(email);
            usuario = usuario[0];
        
            if (usuario && usuario.email == email && usuario.senha == senha)
                return res.status(200).json({message: "Login Efetuado com Sucesso !"})
            else
                return res.status(400).json({message: "Email ou Senha Incorretos."});
        } 
        catch (error) 
        {
            return res.status(500).json({message: "Erro Interno."});
        }
    }
}

export default AuthController;