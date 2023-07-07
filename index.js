import express, { json } from "express";
import { PORT } from "./src/configs/environment.js";
import connectDB from "./src/configs/mongo.js";
import cors from "cors";
//import routers
import usuarioRouter from "./src/routes/usuario.route.js";
import mascotasRouter from "./src/routes/mascota.route.js";
import authRouter from "./src/routes/auth.route.js";
import anuncioRouter from "./src/routes/anuncio.route.js";
import extraviadoRouter from "./src/routes/extravio.route.js";


//app
const app = express();

//conexion con bd.
connectDB();

app.use(cors())
app.use(express.urlencoded({extended: false})); 
app.use(express.json());


app.use("/mascota",mascotasRouter);
app.use("/adopcion",anuncioRouter);
app.use("/auth",authRouter);
app.use("/listado",mascotasRouter)
app.use("/usuarios", usuarioRouter);
app.use("/extraviado", extraviadoRouter);

app.get("/", function (req, res) {
	res.send("<h1>Aquí va el index</h1>");
});
//escucha
app.listen(PORT,()=>{
	console.log(`servidor desplegado en el puerto ${PORT}`)
})
