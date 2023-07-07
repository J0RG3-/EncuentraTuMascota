import dotenv from "dotenv";

dotenv.config();
const usuarioDB=process.env.USER;
const passwordDB=process.env.PASS;
const SECRET = process.env.SECRET;


export const MONGO_URI = `mongodb+srv://${usuarioDB}:${passwordDB}@cluster0.xtbjrzg.mongodb.net/Adopcion?retryWrites=true&w=majority`;
export const PORT = process.env.PORT;

export default{SECRET};
