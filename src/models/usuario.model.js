//TODO: enviar todos los req.params como number.
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
 * Recupera el chat del profesor-alumno, pasandole como parámetro el Id del profesor y el Id del alumno, en ese orden.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @returns any
 */
const selectChatByUsuariosId = (profesorId, alumnoId) => {
    return db.query('SELECT * FROM chat WHERE profesor_id = ? AND alumno_id = ?', [profesorId, alumnoId])
}

/**
 * Devuelve todas las especialidades de un usuario.
 * @param {number} profesorId 
 * @returns any
 */
const selectEspecialidadesByProfesorId = (profesorId) => {
    return db.query('SELECT e.* FROM usuarios_has_especialidades ue JOIN especialidades e ON ue.especialidades_id = e.id WHERE ue.profesor_id = ?',[profesorId])
}

/**
 * Recupera una especialidad determinada de un profesor determinado.
 * @param {number} profesorId 
 * @param {number} especialidadId 
 * @returns any
 */
const selectEspecialidadByProfesorId = (profesorId,especialidadId) => {
    return db.query('SELECT e.* FROM usuarios_has_especialidades ue JOIN especialidades e ON ue.especialidades_id = e.id WHERE ue.profesor_id = ? AND e.id = ?', [profesorId,especialidadId])
}

/**
 * Recupera las puntuaciones de un profesor, cuyo Id es profesorId.
 * @param {number} profesorId 
 * @returns any
 */
const selectPuntuacionesByprofesorId = (profesorId) => {
    return db.query('SELECT p.* FROM puntuaciones p WHERE p.profesor_id = ?', [profesorId])
}
/**
 * Recupera las clases que tiene un profesor con un alumno, pasando como parámetros profesorId y alumnoId, en ese orden.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @returns any
 */
const selectClasesByUsuarioId = (profesorId, alumnoId) => {
    return db.query('SELECT c.* FROM clases c WHERE (c.profesor_id = ? AND c.alumno_id = ?)', [profesorId,alumnoId])
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
 * Agrega una especialidad nueva a un profesor cuyo Id es profesorId, y cuyo Id de la especialidad es especialidadId.
 * @param {number} profesorId 
 * @param {number} especialidadId 
 * @returns any
 */
const insertEspecialidadByProfesorId = (profesorId, especialidadId) => {
    return db.query('INSERT INTO usuarios_has_especialidades (profesor_id, especialidades_id) VALUES (?, ?)',[profesorId,especialidadId])
}

/**
 * Agrega una nueva clase de un profesor.
 * @param {number} profesorId 
 * @param {any} param1 
 * @returns any
 */
const insertClaseByProfesorId = (profesorId,{alumno_id, fecha}) => {
    return db.query ('INSERT INTO clases (profesor_id, alumno_id, fecha VALUES (?,?,?)',[profesorId,alumno_id,fecha])
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

/**
 * Elimina una especialidad de un usuario cuyo Id es profesorId.
 * @param {number} profesorId 
 * @param {number} especialidadId 
 * @returns any
 */
const deleteEspecialidadByUsuarioById = (profesorId,especialidadId) => {
    return db.query("DELETE FROM usuarios_has_especialidades WHERE profesor_id = ? AND especialidades_id = ?",[profesorId,especialidadId])
}

/**
 * Elimina una clase de un profesor.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @param {string} fecha 
 * @returns any
 */
const deleteClaseByProfesorIdByClaseId = (profesorId, alumnoId, fecha) => {
    return db.query("DELETE FROM clases WHERE profesor_id = ? AND alumno_id = ? AND fecha = ?",[profesorId,alumnoId,fecha])
}

module.exports = {SelectAllUsuarios, updateUsuarioById,deleteUsuarioById, insertUsuario, selectUsuarioById, selectEspecialidadesByProfesorId, selectChatByUsuariosId,selectPuntuacionesByprofesorId,selectClasesByUsuarioId,insertEspecialidadByProfesorId,deleteEspecialidadByUsuarioById,selectEspecialidadByProfesorId,deleteClaseByProfesorIdByClaseId,insertClaseByProfesorId}