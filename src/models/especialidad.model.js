/**
 * 
 * @returns muestra todas las especialidades de la DB
 */
const SelectAllEspecialidades = () => {
    return db.query('select * from especialidades')
    
}

module.exports = { SelectAllEspecialidades}