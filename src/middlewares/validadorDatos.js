import { validationResult, body, param } from "express-validator";

export const resultadoValidacion = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }else{
        console.log({ errors})
    }

    next();
};

export const validadorLogin = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    resultadoValidacion,
];


export const validadorRegistro = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "La contraseña debe tener mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecto").custom(
        (value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("Las contraseñas no coinciden");
            }
            return value;
        }
    ),
    resultadoValidacion,
];


