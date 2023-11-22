/**
 * 
 * @returns muestra todos los usuarios de la DB
 */
const SelectAllUsuarios = () => {
    return db.query('select * from usuarios')
}


/**
 * 
 * @param {number} id id del usuario
 * @returns datos del usuario 
 */

const selectUsuarioById = (usuarioId) => {
    return db.query('select * from usuarios where id = ?', [usuarioId]);
}

/**
 * 
 * @param {any} datos del nuevo usuario
 * @returns todos los datos del usuario creado
 */

const insertUsuario = ({nombre, apellidos,  mail, pass, rol}) => {
    console.log("insert")
    return db.query('insert into usuarios (nombre, apellidos, mail, pass, rol) VALUES (?,?,?,?,?)',
    [nombre, apellidos, mail, pass, rol]);
    
}

/**
 * 
 * @param {number} id id del usuario
 * @param {any} param1 datos del usuario
 * @returns datos del usuario modificados
 */
const updateUsuarioById = (id, { nombre, apellidos, mail, pass, foto, tel, pxh, experiencia, lat, lon, activo }) => {
    return db.query('update usuarios set nombre=?, apellidos=?, mail=?, pass=?, foto=?, tel=?, pxh=?, experiencia=?, lat=?, lon=?, activo=? where id=?',[nombre, apellidos, mail, pass, foto, tel, pxh, experiencia, lat, lon, activo, id])
}


/**
 * 
 * @param {number} id id del usuario
 * @returns elimina el usuario
 */
const deleteUsuarioById = (id) => {
    return db.query("delete from usuarios where id=?", [id])
}

module.exports = { SelectAllUsuarios, updateUsuarioById,deleteUsuarioById, insertUsuario, selectUsuarioById}