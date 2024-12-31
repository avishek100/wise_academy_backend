const jwt = require("jsonwebtoken")
const SECRET_KEY = "491316f5d91e8de6004c22cd7c649140f698a78297f46f8206291f85e6faff0c";

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send("No token provided")
    }
    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified;
        next()
    } catch (e) {
        res.status(400).send("Invalid token")

    }

}
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Access Denied:Insufficient Permissions")
        }
        next();
    }


}
module.exports = { authenticateToken, authorizeRole }