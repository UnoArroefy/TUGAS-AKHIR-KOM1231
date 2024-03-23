export const notFound = (req, res, next) => {
    res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
}

export const JSONerror = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({message: "Bad JSON format" });
    }
    next();
}