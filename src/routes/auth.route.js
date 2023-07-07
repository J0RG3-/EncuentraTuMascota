import express from "express";
import { login, registrar } from "../controllers/auth.controller.js";
import {validadorLogin,validadorRegistro} from "../middlewares/validadorDatos.js";

const authRouter=express.Router();

authRouter.post("/register",validadorRegistro,registrar);
authRouter.post("/login",validadorLogin,login)

export default authRouter;