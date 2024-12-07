import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            error: "Authentication token is required",
            status: false,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId; // Attach userId to the request object
        next();
    } catch (err) {
        return res.status(403).json({
            error: "Invalid or expired token",
            status: false,
        });
    }
};

export default authenticate;
