const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "491316f5d91e8de6004c22cd7c649140f698a78297f46f8206291f85e6faff0c";
const Credential = require("../model/Credential")


const register = async (req, res, next) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 18);
    const cred = new Credential({ username, password: hashedPassword, role });
    cred.save();
    res.status(201).send(cred);
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const cred = await Credential.findOne({ username });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send('Invalid username or password');
    }

    const token = jwt.sign({ username: cred.username, role: cred.role },
        SECRET_KEY,
        { expiresIn: '1h' });
    res.json({ token });
};


module.exports = {
    login,
    register
}