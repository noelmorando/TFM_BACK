
/**
 * Recupera todos los usuarios de la DB.
 * @returns any
 */
const SelectAllUsuarios = (page, limit) => {
    return db.query('select * from usuarios');
}

/**
 * Recupera todos los usuarios de la DB con paginado.
 * @returns any
 */
const SelectAllUsuariosByPage = (page, limit) => {
    return db.query('select * from usuarios limit ? offset ?', [limit, (page-1)*limit]);
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
    return db.query('SELECT * FROM foro WHERE profesor_id = ? AND alumno_id = ?', [profesorId, alumnoId])
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
 * Recupera las puntuaciones de un profesor con el alumno
 * @param {number} profesorId 
 * @returns any
 */
const selectPuntuacionesByprofesorId = (profesorId, alumnoId) => {
    return db.query('SELECT p.* FROM puntuaciones p WHERE p.profesor_id = ? AND p.alumno_id = ?', [profesorId,alumnoId])
}
/**
 * Recupera las puntuaciones de un profesor, cuyo Id es profesorId.
 * @param {number} profesorId 
 * @returns any
 */
const selectPuntuaciones = (profesorId) => {
    return db.query('SELECT p.* FROM puntuaciones p WHERE p.profesor_id = ?', [profesorId])
}

/**
 * Recupera los alumnos de un profesor determinado.
 * @param {number} profesorId 
 * @returns any
 */

const selectAlumnosByprofesorId = (profesorId) => {
    return db.query('SELECT * FROM usuarios u inner join conexion c on u.id = c.alumno_id where profesor_id = ?', [profesorId])
    
}

/**
 * Recupera las clases que tiene un profesor con un alumno, pasando como parámetros profesorId y alumnoId, en ese orden.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @returns any
 */
const selectClasesByUsuariosId = (profesorId, alumnoId, especialidadId) => {
    return db.query('SELECT c.* FROM clases c WHERE (c.profesor_id = ? AND c.alumno_id = ? AND especialidades_id = ?)', [profesorId,alumnoId, especialidadId])
}
/**
 * trae todos los datos del profesor desde la tabla conexion
 * @param {number} profesorId 
 * @returns any
 */
const selectProfesorByConexion = (profesorId) => {
    return db.query('SELECT c.* FROM conexion c WHERE (c.profesor_id = ?)', [profesorId])
}
/**
 * Recupera las clases que tiene un usuario (sea alumno o profesor) pasando como parámetros usuarioId.
 * @param {number} usuarioId 
 * @returns any
 */
const selectClasesByUsuarioId = (usuarioId) => {
    return db.query('SELECT c.* FROM clases c WHERE (c.profesor_id = ? OR c.alumno_id = ?)', [usuarioId, usuarioId])
}

/**
 * Crea un nuevo usuario.
 * @param {any} datos datos del nuevo usuario
 * @returns any
 */
const insertUsuario = ({nombre, apellidos,  mail, pass, rol, foto, tel, pxh, experiencia, lat, lon}) => {
    if(rol=="prof"){
        return db.query('insert into usuarios (nombre, apellidos, mail, pass, rol,activo,foto, tel, pxh, experiencia, lat, lon) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [nombre, apellidos, mail, pass, rol,0,foto, tel, pxh, experiencia, lat, lon]);
    }
    return db.query('insert into usuarios (nombre, apellidos, mail, pass, rol) VALUES (?,?,?,?,?)',
        [nombre, apellidos, mail, pass, rol]);
}
/**
 * se crea la petición de conexión.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @returns any
 */
const insertAlumnosByProfesorId = (profesorId,alumnoId,especialidadId) => {
    return db.query('INSERT INTO conexion (profesor_id, alumno_id, activo,especialidades_id) VALUES (?, ?, ?,?)',[profesorId,alumnoId,0,especialidadId])
}
/**
 * Agrega una nueva clase de un profesor.
 * @param {number} profesorId 
 * @param {any} param1 
 * @returns any
 */
const insertClaseByProfesorId = (profesorId,{alumno_id, fecha,especialidades_id}) => {
    return db.query ('INSERT INTO clases (profesor_id, alumno_id, fecha, especialidades_id) VALUES (?, ?, ?, ?)',[profesorId,alumno_id,fecha,especialidades_id])
}
const createConexion = (profesorId,{alumno_id,especialidades_id}) => {
    return db.query ('INSERT INTO clases (profesor_id, alumno_id, especialidades_id) VALUES (?, ?, ?)',[profesorId,alumno_id,especialidades_id])
}
/**
 * Agrega un comentario al chat.
 * @param {number} profesorId 
 * @param {any} param1  
 * @returns any
 */
const insertChatByUsersId = (profesorId,alumno_id,comentarios) => {
    return db.query('INSERT INTO foro (profesor_id, alumno_id, comentarios) VALUES (?, ?, ?)',[profesorId,alumno_id,comentarios])
}

/**
 * Inserta un comentario hecho por un alumno con valoración numérica.
 * @param {number} profesor_id 
 * @param {number} alumno_id 
 * @param {number} puntuacion 
 * @param {string} comentarios 
 * @returns 
 */
const insertRatingByAlumn = (profesor_id, alumno_id, puntuacion, comentarios) => {
    return db.query('INSERT INTO teacherapp.puntuaciones (profesor_id, alumno_id, puntuacion, comentarios) VALUES (?, ?, ?, ?)', [profesor_id, alumno_id, puntuacion, comentarios]);
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
 * se acepta la conexión entre alumno y profesor.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @returns any
 */
const updateAlumnosByProfesorId = (profesorId,alumnoId,especialidadId) => {
    return db.query('UPDATE conexion SET activo=? where profesor_id = ? AND alumno_id = ? AND especialidades_id = ?', [1,profesorId,alumnoId,especialidadId])
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
 * Elimina la conexión entre el alumno y el profesor.
 * @param {number} profesorId 
 * @param {number} alumnoId 
 * @returns any
 */
const deleteAlumnosByProfesorId = (profesorId,alumnoId,especialidadId) => {
    return db.query('DELETE FROM conexion where profesor_id = ? AND alumno_id = ? AND especialidades_id = ?', [profesorId,alumnoId,especialidadId])
}
/**
 * Elimina una clase de un profesor.
 * @param {number} id 
 * @returns any
 */
const deleteClaseByProfesorIdByClaseId = (id) => {
    console.log("model",id)
    return db.query("DELETE FROM clases WHERE id =?",[id])
}

module.exports = {SelectAllUsuarios, SelectAllUsuariosByPage, updateUsuarioById,deleteUsuarioById, insertUsuario, selectUsuarioById, selectEspecialidadesByProfesorId, selectChatByUsuariosId,selectPuntuacionesByprofesorId, selectAlumnosByprofesorId, selectClasesByUsuariosId, selectClasesByUsuarioId, deleteEspecialidadByUsuarioById,selectEspecialidadByProfesorId,deleteClaseByProfesorIdByClaseId,insertClaseByProfesorId,insertChatByUsersId,insertAlumnosByProfesorId,deleteAlumnosByProfesorId,updateAlumnosByProfesorId,selectProfesorByConexion, insertRatingByAlumn, selectPuntuaciones,createConexion}