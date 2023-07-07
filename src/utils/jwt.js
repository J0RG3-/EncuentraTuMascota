import jsonwebtoken from "jsonwebtoken";
import SECRET from "../configs/environment.js";

const { SECRETO } = SECRET;

export function generarAccesToken(usuario) {
	const { _id, email } = usuario;
	return jsonwebtoken.sign({ id: _id, email }, SECRETO, {
		expiresIn: "10m",
	});
}

export function verificarToken(token) {
	return jsonwebtoken.verify(token, SECRETO);
}