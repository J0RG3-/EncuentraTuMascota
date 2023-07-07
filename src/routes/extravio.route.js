import express from "express";
import {cambiarEstadoExtravioMascota,getMascotasExtraviadas} from "../controllers/mascota.controller.js";

const router = express.Router();

router.get("/listado", getMascotasExtraviadas);
router.post("/estado", cambiarEstadoExtravioMascota);


export default router;