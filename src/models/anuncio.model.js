import mongoose from "mongoose";

const anuncioAdopcionSchema = new mongoose.Schema({
	idUsuario:{
		type:String,
		required:true,
	},
    especie: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	edad: {
		type: Number,
		required: true,
	},
	sexo: {
		type: String,
		required: true,
	},
	fotos: {
		type: [String],
		required: true,
	},
    estadoAdoptado: {
		type: Boolean,
		required: true,
	},
});

const anuncioAdopcionModelo = mongoose.model("AnuncioAdopcion", anuncioAdopcionSchema);

export default anuncioAdopcionModelo;