import jsonwebtoken from "jsonwebtoken";
import {SECRET} from "../configs/environment.js";


export function generarAccesToken(usuario) {
	const { _id, email } = usuario;
	return jsonwebtoken.sign({ id: _id, email: email }, SECRET, {
		expiresIn: "10m",
	});
}

export function verificarToken(token) {
	return jsonwebtoken.verify(token, SECRETO);
}