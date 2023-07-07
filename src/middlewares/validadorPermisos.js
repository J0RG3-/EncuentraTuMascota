//import usuario from "./models/usuario.model.js";
import { verificarToken } from "./utils/jwt.js";

export function authRequired(req, res, next) {
	const authorizationHeader =
		req.headers.authorization || req.headers.Authorization;

	try {
		const token = authorizationHeader.split(" ")[1];

		if (!token) {
			throw new Error("sin token");
		}

		const { id } = verificarToken(token);

		req.id = id;

		return next();
	} catch (error) {
		return res
			.status(403)
			.send({ error: "no tienes los permisos (falta token o esta expirado)" });
	}
}