/**
 * Muestra todas las especialidades de la DB
 * @returns any 
 */
const SelectAllEspecialidades = () => {
    return db.query('select * from especialidades')
    
}
/**
 * Recupera todos los usuarios que tienen una especialidad cuyo Id de esa especialidad es especialidadId.
 * @param {number} especialidadId 
 * @returns any
 */
const getUsuariosByEspecialidad = (especialidadId) => {
    return db.query('SELECT u.* FROM usuarios_has_especialidades ue JOIN usuarios u ON ue.profesor_id = u.id WHERE ue.especialidades_id = ?', [especialidadId])
}

module.exports = { SelectAllEspecialidades, getUsuariosByEspecialidad}