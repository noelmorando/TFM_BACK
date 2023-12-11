const dayjs = require('dayjs')
const jsonwebtoken = require('jsonwebtoken');
const createToken = (user) => {
    const payload = {
        user_id: user.id,
        user_rol: user.rol,
        user_name: user.nombre,
        user_surname: user.apellidos,
        exp: dayjs().add(1, 'days').unix()
    };

    return jsonwebtoken.sign(payload, process.env.SECRET_KEY);
};


module.exports = { createToken };
