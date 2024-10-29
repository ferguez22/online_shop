const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
    const data = {
        usuario_id: user._id,
        usuario_role: user.role
    }
    return jwt.sign(data, 'SuperPassword')
}