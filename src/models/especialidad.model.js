/**
 * Muestra todas las especialidades de la DB
 * @returns any 
 */
const SelectAllEspecialidades = () => {
    return db.query('select * from especialidades')
    
}
/**
 * Muestra las especialidades de la DB paginadas
 * @returns any 
 */
const SelectEspecialidadesByPage = (page, limit) => {
    return db.query('select * from especialidades limit ? offset ?', [limit, (page-1)*limit]);
    
}
/**
 * Recupera todos los usuarios que tienen una especialidad cuyo Id de esa especialidad es especialidadId.
 * @param {number} especialidadId 
 * @returns any
 */
const getUsuariosByEspecialidad = (especialidadId, page, limit) => {
    return db.query('SELECT u.* FROM usuarios_has_especialidades ue JOIN usuarios u ON ue.profesor_id = u.id WHERE ue.especialidades_id = ? limit ? offset ?', [especialidadId, limit, (page-1)*limit])
   
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

module.exports = { SelectAllEspecialidades, SelectEspecialidadesByPage, getUsuariosByEspecialidad, insertEspecialidadByProfesorId}