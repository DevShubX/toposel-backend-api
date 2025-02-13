const { authenticateJWT } = require('../lib/jwtTokenMethods');
const User = require('../models/User');

const searchUser = async (req, res) => {
    const { username, email } = req.query;
    try {
        const token = req.headers.authorization.split(" ").pop();
        if (!token) {
            return res.status(400).json({ msg: "Unauthorized" });
        }

        const isVerified = authenticateJWT(token);

        if (!isVerified) {
            return res.status(400).json({ msg: "Authentication Failed" });
        }

        const user = await User.findOne({
            $or: [{ username }, { email }],
        }).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errmsg: "Internal Server Error" });
    }
}


module.exports = {searchUser}