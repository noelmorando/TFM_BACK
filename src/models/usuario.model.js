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
 * @param {number} usuarioId 
 * @returns devuelve todas las especialidades de un usuario
 */
const selectEspecialidadesByUsuarioId = (usuarioId) => {
    return db.query('SELECT e.* FROM usuarios_has_especialidades ue JOIN especialidades e ON ue.especialidades_id = e.id WHERE ue.profesor_id = ?',[usuarioId])
}

/**
 * 
 * @param {any} datos datos del nuevo usuario
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

module.exports = { SelectAllUsuarios, updateUsuarioById,deleteUsuarioById, insertUsuario, selectUsuarioById, selectEspecialidadesByUsuarioId}