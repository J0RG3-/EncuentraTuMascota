import Mascota from "../models/mascota.model.js";
import Usuario from "../models/usuario.model.js";
import { ObjectId } from "mongodb";
import { SECRET } from "../configs/environment.js";
import jwt from "jsonwebtoken"

async function getListadoMascotas(req, res) {
  const mascotas = await Mascota.find();
  return res.status(200).json({ mascotas });
}

async function getMascotaPorId(req, res) {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ error: "no existe la mascota solicitada" });
    } else {
      return res.status(201).json({ mascota });
    }
  } catch (e) {
    return res
      .status(500)
      .json({
        error: "Hubo un error con los datos solicitados. Inténtelo nuevamente",
      });
  }
}

async function nuevaMascota(req, res) {
  const { token,nombre, descripcion, edad, especie, sexo, nroChip, fotos,extraviada } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET);
    await Mascota.create({
      idUsuario: decoded.id,
      nombre: nombre,
      descripcion: descripcion,
      edad: edad,
      especie: especie,
      sexo: sexo,
      nroChip: nroChip,
      fotos: fotos,
      extraviada: extraviada,
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        error: "No se pudo guardar la información. Inténtelo nuevamente",
      });
  }
}

async function borrarMascota(req, res) {
  const { id } = req.params;
  try {
    const result = await Mascota.findById(id);

    if (!result) {
      return res.status(404).json({ error: "no existe la mascota solicitada" });
    } else {
        await Mascota.findByIdAndRemove(id);
      return res
        .status(200)
        .json({ success: "Mascota eliminada correctamente" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        error:
          "Hubo un error al eliminar la mascota seleccionada. Inténtelo nuevamente",
      });
  }
}

async function editarMascota(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, edad, especie, sexo, nroChip, fotos } =
      req.body;

    const filter = { _id: new ObjectId(id) };

    const update = {
      $set: {
        nombre: nombre,
        descripcion: descripcion,
        edad: edad,
        especie: especie,
        sexo: sexo,
        nroChip: nroChip,
        fotos: fotos,
      },
    };

    const result = await Mascota.findOne(filter);
    if (result == null) {
      return res.status(404).json({ error: "no existe la mascota solicitada" });
    } else {
      await Mascota.updateOne(filter, update);
      return res
        .status(201)
        .json({ response: "Mascota editada correctamente" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error });
  }
}

async function cambiarEstadoExtravioMascota(req, res) {
  try {
    const { idMascota, extraviada } = req.body;

    const update = {
      $set: {
        extraviada: extraviada,
      },
    };

    const mascota = await Mascota.findById(idMascota);

    if (!mascota) {

      return res.status(401).json({ error: "no existe la mascota solicitada" });
    } 
    /*else if(!Usuario.findOne(idUsuario)){
      //falta cerrar la sesión si el usuario no coincide con el que está logeado
      return res.status(403).json({ error: "Por seguridad se ha cerrado su sesión. Inicie sesión nuevamente para continuar"});
    }
      */
    else {
      await Mascota.updateOne(mascota, update);
      return res
        .status(201)
        .json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Hubo un error con los datos solicitados. Inténtelo nuevamente" }); 
  }
}


async function getMascotasExtraviadas(req, res) {
  try {
    //const mascotasExtraviadas = await Mascota.find(extraviada=true);

    const mascotasExtraviadas = await Mascota.find({ extraviada: true }).exec();

    if (mascotasExtraviadas!=null) {
      return res.status(200).json({ mascotasExtraviadas });
    } else {
      return res.status(404).json({ res:"no existen mascotas extraviadas" });
    }
  } catch (e) {
    //"Hubo un error con los datos solicitados. Inténtelo nuevamente"
    return res.status(500).json({error: e});
  }
}

export {
  getListadoMascotas,
  getMascotaPorId,
  nuevaMascota,
  borrarMascota,
  editarMascota,
  cambiarEstadoExtravioMascota,
  getMascotasExtraviadas,

};
