const dayjs = require('dayjs')
const jsonwebtoken = require('jsonwebtoken');
const createToken = (user) => {
    console.log(user)
    const payload = {
        user_id: user.id,
        user_rol: user.rol,
        exp: dayjs().add(1, 'days').unix()
    };

    return jsonwebtoken.sign(payload, process.env.SECRET_KEY);
};


module.exports = { createToken };