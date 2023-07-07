import express from "express";
import { getAnuncio, getListadoAnuncios,nuevoAnuncioAdopcion,eliminarAnuncioAdopcion } from "../controllers/anuncio.controller.js";

const router = express.Router();

router.get("/:id", getAnuncio);
router.get("/listado", getListadoAnuncios);
router.post("/agregar", nuevoAnuncioAdopcion);
router.delete("/eliminar", eliminarAnuncioAdopcion);

export default router;