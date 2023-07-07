import Usuario from "../models/usuario.model.js"
import bcrypt from "bcrypt"
import { generarAccesToken} from "../utils/jwt.js";

export async function registrar(req, res) {
	try {
		const { nombre, apPaterno, apMaterno, email, password} = req.body;

		const nuevoUsuario = await Usuario.create({
			nombre: nombre,
			apPaterno: apPaterno,
			apMaterno: apMaterno,
			email: email,
			password: await passwordEncrypt(password),
		});
		return res.status(201).json({ response: nuevoUsuario });

	} catch (error) {
		return res.status(500).json({ error });
	}
}

export async function login(req, res) {
	try {
		const { password, email } = req.body;
		const usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(404).json({ error: "El usuario no existe" });
		}

		if (await comparePassword(password, usuario.password)) {
			const accesToken = generarAccesToken(usuario);
			return res.status(200).json({ accesToken });
		} else {
			return res.status(401).json({ error: "Credenciales incorrectas" });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error interno del servidor" });
	}
}

async function passwordEncrypt(password) {
	return await bcrypt.hash(password, 10);
}

async function comparePassword(password, encryptedPassword) {
	return await bcrypt.compare(password, encryptedPassword);
}