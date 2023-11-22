const SelectAllUsuarios = () => {
    return db.query('select * from usuarios')
}

module.exports = {SelectAllUsuarios}