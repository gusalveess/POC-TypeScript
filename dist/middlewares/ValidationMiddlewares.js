export function schemaValidationMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            res.status(409).send('Formato Inválido');
            return;
        }
        next();
    };
}
