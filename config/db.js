import mongoose from "mongoose";

const connectDB = async () => {
    try
    {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log("Mongo Conectado com Sucesso");
    }
    catch (error)
    {
        console.error("Erro ao Conectar ao Banco", error);
        process.exit(1);
    }
}

export default connectDB;