/**
 * Recupera todos los usuarios de la DB.
 * @returns any
 */
const SelectAllUsuarios = () => {
    return db.query('select * from usuarios')
}


/**
 * Recupera los datos del usuario.
 * @param {number} id id del usuario
 * @returns any
 */

const selectUsuarioById = (usuarioId) => {
    return db.query('select * from usuarios where id = ?', [usuarioId]);
}

/**
 * Devuelve todas las especialidades de un usuario.
 * @param {number} profesorId 
 * @returns any
 */
const selectEspecialidadesByUsuarioId = (profesorId) => {
    return db.query('SELECT e.* FROM usuarios_has_especialidades ue JOIN especialidades e ON ue.especialidades_id = e.id WHERE ue.profesor_id = ?',[profesorId])
}

/**
 * Crea un nuevo usuario.
 * @param {any} datos datos del nuevo usuario
 * @returns any
 */

const insertUsuario = ({nombre, apellidos,  mail, pass, rol}) => {
    console.log("insert")
    return db.query('insert into usuarios (nombre, apellidos, mail, pass, rol) VALUES (?,?,?,?,?)',
    [nombre, apellidos, mail, pass, rol]);
    
}

/**
 * Actualiza los datos del usuario.
 * @param {number} id id del usuario
 * @param {any} param1 datos del usuario
 * @returns any
 */
const updateUsuarioById = (id, { nombre, apellidos, mail, pass, foto, tel, pxh, experiencia, lat, lon, activo }) => {
    return db.query('update usuarios set nombre=?, apellidos=?, mail=?, pass=?, foto=?, tel=?, pxh=?, experiencia=?, lat=?, lon=?, activo=? where id=?',[nombre, apellidos, mail, pass, foto, tel, pxh, experiencia, lat, lon, activo, id])
}


/**
 * Elimina el usuario.
 * @param {number} id id del usuario
 * @returns any
 */
const deleteUsuarioById = (id) => {
    return db.query("delete from usuarios where id=?", [id])
}

module.exports = { SelectAllUsuarios, updateUsuarioById,deleteUsuarioById, insertUsuario, selectUsuarioById, selectEspecialidadesByUsuarioId}