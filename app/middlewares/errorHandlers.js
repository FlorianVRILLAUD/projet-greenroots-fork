function notFound(req, res, next) {
    const error = new Error("Accroches-toi mon petit chat, on retourne à la page d'accueil");

    error.status = 404;
    

    // * Quand on appelle next en lui passant un argument : express lève une erreur
    next(error);
}

//* si express lève une erreur, on doit la gérer
function errorHandler(error, req, res, next) {
    // Le code http sera celui que l'on fourni ou sera 500

    const status = error.status || 500;

    res.status(status).render('404', { message: error.message });
}

export { notFound, errorHandler };