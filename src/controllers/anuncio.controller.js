import AnuncioAdopcion from "../models/anuncio.model.js";

async function getListadoAnuncios(req, res) {
	try{
	const anuncios = await AnuncioAdopcion.find();
	return res.status(200).json({ anuncios });
	} catch (error) {
	return res.status(500).json({ error });
}
}

async function getAnuncio(req, res) {
	try {
		const anuncio = await AnuncioAdopcion.findOne(req.params.userId);
		return res.status(200).json({ anuncio });
	} catch (error) {
		return res.status(500).json({ error });
	}
}


async function nuevoAnuncioAdopcion(req, res) {
  
    const { idUsuario,especie, descripcion, edad, sexo, fotos,estadoAdoptado } =
      req.body;
  try {
    await AnuncioAdopcion.create({
      idUsuario:idUsuario,
	    especie: especie,
      descripcion: descripcion,
      edad: edad,
      sexo: sexo,
      fotos: fotos,
	    estadoAdoptado: estadoAdoptado
    });
    
    return res.status(201).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "No se pudo guardar la información. Inténtelo nuevamente" });
  }
}


async function eliminarAnuncioAdopcion(req, res) {
  const { idAnuncio } = req.body;
  try {
    await AnuncioAdopcion.deleteOne({idAnuncio});
    
    return res.status(201).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "No se eliminar. Inténtelo nuevamente" });
  }
}

export {
	getAnuncio,getListadoAnuncios,nuevoAnuncioAdopcion,eliminarAnuncioAdopcion
};
