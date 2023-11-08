// middleware de erro personalizado
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Registrar o erro no console para fins de depuração
    res.status(err.status || 500).json({ error: err.message });
}


module.exports = errorHandler;